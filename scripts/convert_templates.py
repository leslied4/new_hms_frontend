#!/usr/bin/env python3
from __future__ import annotations

import re
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[2]
TEMPLATES_DIR = BASE_DIR / "templates"
FRONTEND_DIR = Path(__file__).resolve().parents[1]
SRC_DIR = FRONTEND_DIR / "src"

PAGE_DIR = SRC_DIR / "pages"
ELEMENT_DIR = SRC_DIR / "elements"
LAYOUT_DIR = SRC_DIR / "layouts"

VALID_EXTS = {".php", ".ctp"}
SKIP_SUFFIXES = (".bak", ".backup")

PHP_BLOCK_RE = re.compile(r"<\?(?:php)?(.*?)\?>", re.DOTALL | re.IGNORECASE)


def to_pascal(parts: list[str]) -> str:
    tokens: list[str] = []
    for part in parts:
        for token in re.split(r"[^A-Za-z0-9]+", part):
            if not token:
                continue
            tokens.append(token[:1].upper() + token[1:])
    if not tokens:
        return "Template"
    name = "".join(tokens)
    if name[:1].isdigit():
        name = f"T{name}"
    return name


def sanitize_php_blocks(text: str) -> str:
    def _repl(match: re.Match[str]) -> str:
        content = match.group(1).strip()
        content = re.sub(r"\s+", " ", content)
        content = content.replace("--", "- -")
        if len(content) > 240:
            content = content[:240] + "..."
        return f"<!-- php: {content} -->"

    return PHP_BLOCK_RE.sub(_repl, text)


def escape_template_literal(text: str) -> str:
    return text.replace("`", "\\`").replace("${", "\\${")


def write_component(
    target_file: Path,
    component_name: str,
    raw_html: str,
    title: str | None = None,
    source_path: str | None = None,
) -> None:
    target_file.parent.mkdir(parents=True, exist_ok=True)

    if title and source_path:
        rel_import = Path(
            re.sub(r"\\\\", "/", str(Path("components") / "PageShell"))
        )
        depth = len(target_file.relative_to(SRC_DIR).parents) - 1
        prefix = "../" * depth
        import_path = f"{prefix}{rel_import}"
        content = (
            f"import PageShell from '{import_path}';\n\n"
            f"const sourcePath = '{source_path}';\n"
            f"const rawHtml = `\n{raw_html}\n`;\n\n"
            f"export default function {component_name}() {{\n"
            f"  return (\n"
            f"    <PageShell title=\"{title}\" sourcePath={{sourcePath}}>\n"
            f"      <div className=\"template-frame\">\n"
            f"        <div\n"
            f"          className=\"template-content\"\n"
            f"          dangerouslySetInnerHTML={{ __html: rawHtml }}\n"
            f"        />\n"
            f"      </div>\n"
            f"    </PageShell>\n"
            f"  );\n"
            f"}}\n"
        )
    else:
        content = (
            f"const rawHtml = `\n{raw_html}\n`;\n\n"
            f"export default function {component_name}() {{\n"
            f"  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;\n"
            f"}}\n"
        )

    target_file.write_text(content, encoding="utf-8")


def build_component_name(rel_path: Path, kind: str) -> str:
    parts = list(rel_path.with_suffix("").parts)
    base = to_pascal(parts)
    if kind == "page":
        return f"{base}Page"
    if kind == "element":
        return f"Element{base}"
    if kind == "layout":
        return f"Layout{base}"
    return base


def main() -> None:
    if not TEMPLATES_DIR.exists():
        raise SystemExit(f"Missing templates directory: {TEMPLATES_DIR}")

    page_routes: list[dict[str, str]] = []

    for template_path in TEMPLATES_DIR.rglob("*"):
        if not template_path.is_file():
            continue
        if template_path.suffix not in VALID_EXTS:
            continue
        if any(str(template_path).endswith(suffix) for suffix in SKIP_SUFFIXES):
            continue

        rel_path = template_path.relative_to(TEMPLATES_DIR)
        parts = rel_path.parts
        if parts[0] == "element":
            kind = "element"
            target_dir = ELEMENT_DIR
        elif parts[0] == "Layout":
            kind = "layout"
            target_dir = LAYOUT_DIR
        else:
            kind = "page"
            target_dir = PAGE_DIR

        raw = template_path.read_text(encoding="utf-8", errors="ignore")
        raw = sanitize_php_blocks(raw)
        raw = escape_template_literal(raw)

        component_name = build_component_name(rel_path, kind)
        target_file = target_dir / rel_path.with_suffix(".tsx")

        if kind == "page":
            source_path = f"templates/{rel_path.as_posix()}"
            title = rel_path.as_posix()
            write_component(target_file, component_name, raw, title=title, source_path=source_path)

            route_path = "/" + rel_path.with_suffix("").as_posix()
            import_path = "./pages/" + rel_path.with_suffix("").as_posix()
            page_routes.append(
                {
                    "path": route_path,
                    "label": rel_path.as_posix(),
                    "source": source_path,
                    "import_path": import_path,
                    "component": component_name,
                }
            )
        else:
            write_component(target_file, component_name, raw)

    routes_file = SRC_DIR / "routes.tsx"
    route_lines = ["import { lazy } from 'react';", "", "export const templateRoutes = ["]
    for route in sorted(page_routes, key=lambda r: r["label"].lower()):
        route_lines.append("  {")
        route_lines.append(f"    path: '{route['path']}',")
        route_lines.append(f"    label: '{route['label']}',")
        route_lines.append(f"    sourcePath: '{route['source']}',")
        route_lines.append(
            "    Component: lazy(() => import('" + route["import_path"] + "')),")
        route_lines.append("  },")
    route_lines.append("] as const;\n")

    routes_file.write_text("\n".join(route_lines), encoding="utf-8")


if __name__ == "__main__":
    main()
