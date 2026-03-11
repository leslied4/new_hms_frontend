const rawHtml = `
<!-- php: $theme1 = isset($inst_name) && $inst_name->theme1 != null ? $inst_name->theme1 : (Cake\Core\Configure::read('THEME1', 'red')); $theme2 = isset($inst_name) && $inst_name->theme2 != null ? $inst_name->theme2 : (Cake\Core\Configure::read('THEM... -->

`;

export default function ElementElementThemeColor() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
