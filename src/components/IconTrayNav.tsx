import { Link, useLocation } from 'react-router-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type TrayLink = {
  label: string;
  to: string;
};

type TraySection = {
  id: string;
  label: string;
  icon: 'home' | 'patients' | 'labs' | 'scans' | 'meds' | 'billing' | 'inventory' | 'manage';
  links: TrayLink[];
};

const sections: TraySection[] = [
  {
    id: 'home',
    label: 'Home',
    icon: 'home',
    links: [
      { label: 'Dashboard Home', to: '/Home/index' },
      { label: 'Nurse Station', to: '/NurseStation/index' },
      { label: 'Doctors Queue', to: '/Queue/doctor' },
    ],
  },
  {
    id: 'patients',
    label: 'Patients',
    icon: 'patients',
    links: [
      { label: 'View Patients', to: '/Patients/view_patients' },
      { label: 'Add Patient', to: '/Patients/add_patient' },
      { label: 'Firstline24 Walk-In Module', to: '/Patients/add_walkin_patient' },
      { label: 'View OPD Visits', to: '/Patients/view_opd_visits' },
      { label: 'View IPD Visits', to: '/Patients/view_visits_ipd' },
      { label: 'Sessions Planner', to: '/Sessions/planner' },
    ],
  },
  {
    id: 'labs',
    label: 'Labs',
    icon: 'labs',
    links: [
      { label: 'Requested Labs', to: '/RequestLabs/index' },
      { label: 'Walk-In Lab', to: '/Patients/add_walkin_patient?type=walkinlab' },
      { label: 'Specimen Tracker', to: '/RequestLabs/specimen_tracker' },
    ],
  },
  {
    id: 'scans',
    label: 'Scans',
    icon: 'scans',
    links: [
      { label: 'Requested Scans', to: '/RequestRadiologies/index' },
      { label: 'Walk-In Scan', to: '/Patients/add_walkin_patient?type=walkinScan' },
    ],
  },
  {
    id: 'meds',
    label: 'Meds',
    icon: 'meds',
    links: [
      { label: 'Requested Medications', to: '/RequestMedications/index' },
      { label: 'Walk-In Medication', to: '/Patients/add_walkin_patient?type=walkindrug' },
      { label: 'Medication View Request', to: '/RequestMedications/view_request' },
    ],
  },
  {
    id: 'billing',
    label: 'Billing',
    icon: 'billing',
    links: [
      { label: 'Billings Index', to: '/Billings/index' },
      { label: 'Claims', to: '/CreditClaims/index' },
    ],
  },
  {
    id: 'inventory',
    label: 'Inventory',
    icon: 'inventory',
    links: [
      { label: 'Items Directory', to: '/Inventory/items' },
      { label: 'Add Item', to: '/Inventory/add_item' },
      { label: 'Central Store', to: '/Inventory/main_store' },
      { label: 'Equipment Directory', to: '/InventoryList/manage_equipment' },
      { label: 'Receive Purchases', to: '/Inventory/receive_purchases' },
      { label: 'VSP Procurement', to: '/VspProcurement/vsp' },
    ],
  },
  {
    id: 'manage',
    label: 'Manage',
    icon: 'manage',
    links: [
      { label: 'Settings', to: '/Settings/index' },
      { label: 'Manage Security', to: '/ManageSecurity/index' },
      { label: 'Sessions Index', to: '/Sessions/index' },
      { label: 'Inventory Manage', to: '/Inventory/manage' },
      { label: 'VSP Directory', to: '/VspProcurement/index' },
      { label: 'Manage Labs', to: '/ManageLabs/index' },
      { label: 'Manage Radiologies', to: '/ManageRadiologies/index' },
      { label: 'Insurance', to: '/ManageInsurances/index' },
    ],
  },
];

function normalizePath(path: string): string {
  return path.split('?')[0].replace(/\/+$/, '') || '/';
}

function splitTarget(target: string): { path: string; search: URLSearchParams } {
  const [pathPart, queryPart] = target.split('?');
  return {
    path: normalizePath(pathPart || '/'),
    search: new URLSearchParams(queryPart || ''),
  };
}

function linkMatches(currentPath: string, currentSearch: string, target: string): boolean {
  const normalizedCurrent = normalizePath(currentPath);
  const currentParams = new URLSearchParams(currentSearch);
  const { path: normalizedTarget, search: targetParams } = splitTarget(target);
  if (normalizedCurrent === normalizedTarget) return true;
  if (!normalizedCurrent.startsWith(`${normalizedTarget}/`)) return false;
  for (const [key, value] of targetParams.entries()) {
    if (currentParams.get(key) !== value) return false;
  }
  return true;
}

function accentClasses(sectionId: string) {
  switch (sectionId) {
    case 'home':
      return { chip: 'from-sky-200/80 to-blue-300/60', blob: 'bg-sky-300/60', rail: 'bg-sky-500', ring: 'border-sky-500/70' };
    case 'patients':
      return { chip: 'from-emerald-200/80 to-teal-300/60', blob: 'bg-emerald-300/60', rail: 'bg-emerald-500', ring: 'border-emerald-500/70' };
    case 'labs':
      return { chip: 'from-cyan-200/80 to-sky-300/60', blob: 'bg-cyan-300/60', rail: 'bg-cyan-500', ring: 'border-cyan-500/70' };
    case 'scans':
      return { chip: 'from-indigo-200/80 to-blue-300/60', blob: 'bg-indigo-300/60', rail: 'bg-indigo-500', ring: 'border-indigo-500/70' };
    case 'meds':
      return { chip: 'from-rose-200/80 to-pink-300/60', blob: 'bg-rose-300/60', rail: 'bg-rose-500', ring: 'border-rose-500/70' };
    case 'billing':
      return { chip: 'from-amber-200/80 to-orange-300/60', blob: 'bg-amber-300/60', rail: 'bg-amber-500', ring: 'border-amber-500/70' };
    case 'inventory':
      return { chip: 'from-teal-200/80 to-cyan-300/60', blob: 'bg-teal-300/60', rail: 'bg-teal-500', ring: 'border-teal-500/70' };
    default:
      return { chip: 'from-slate-200/80 to-slate-300/60', blob: 'bg-slate-300/60', rail: 'bg-slate-500', ring: 'border-slate-500/70' };
  }
}

function TrayIcon({ name }: { name: TraySection['icon'] }) {
  const cls = 'h-5 w-5';
  if (name === 'home') {
    return <svg viewBox="0 0 24 24" fill="currentColor" className={cls}><path d="M12 3 2.5 10.8l1.3 1.6L5 11.4V21h14v-9.6l1.2 1 1.3-1.6zM10 19v-5h4v5z" /></svg>;
  }
  if (name === 'patients') {
    return <svg viewBox="0 0 24 24" fill="currentColor" className={cls}><path d="M9 5a3.2 3.2 0 1 1 0 6.4A3.2 3.2 0 0 1 9 5Zm8.2 1.6a2.6 2.6 0 1 1 0 5.2 2.6 2.6 0 0 1 0-5.2ZM2.6 20a6.4 6.4 0 0 1 12.8 0H2.6Zm11.9 0a4.7 4.7 0 0 1 7 0h-7Z" /></svg>;
  }
  if (name === 'labs') {
    return <svg viewBox="0 0 24 24" fill="currentColor" className={cls}><path d="M9 3h6v2h-1v3.5l5.9 9.9A2.1 2.1 0 0 1 18.1 22H5.9a2.1 2.1 0 0 1-1.8-3.1L10 8.5V5H9V3Zm-.8 10L6 16.8a.3.3 0 0 0 .3.5h11.4a.3.3 0 0 0 .3-.5L15.8 13H8.2Z" /></svg>;
  }
  if (name === 'scans') {
    return <svg viewBox="0 0 24 24" fill="currentColor" className={cls}><path d="M5.5 4A2.5 2.5 0 0 0 3 6.5v11A2.5 2.5 0 0 0 5.5 20h13a2.5 2.5 0 0 0 2.5-2.5v-11A2.5 2.5 0 0 0 18.5 4h-13ZM9 8a2.2 2.2 0 1 1 0 4.4A2.2 2.2 0 0 1 9 8Zm10 9.2V17a.8.8 0 0 0-.2-.5l-2-2.2a.8.8 0 0 0-1.1-.1l-2.6 2-2.4-1.6a.8.8 0 0 0-1 .1L5 17.2Z" /></svg>;
  }
  if (name === 'meds') {
    return <svg viewBox="0 0 24 24" fill="currentColor" className={cls}><path d="M7 3h10a1 1 0 0 1 1 1v5H6V4a1 1 0 0 1 1-1Zm-1 8h12v9a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-9Zm2.5 2v2h2v-2h3v2h2v-2h1v6H7v-6h1.5Z" /></svg>;
  }
  if (name === 'billing') {
    return <svg viewBox="0 0 24 24" fill="currentColor" className={cls}><path d="M5.5 5A2.5 2.5 0 0 0 3 7.5v9A2.5 2.5 0 0 0 5.5 19h13a2.5 2.5 0 0 0 2.5-2.5v-9A2.5 2.5 0 0 0 18.5 5h-13ZM5 9h14v2H5V9Zm2 5h5v2H7v-2Z" /></svg>;
  }
  if (name === 'inventory') {
    return <svg viewBox="0 0 24 24" fill="currentColor" className={cls}><path d="M4 6.5 12 3l8 3.5v11L12 21l-8-3.5v-11Zm8-1.3L6.7 7.5 12 9.8l5.3-2.3L12 5.2Zm-6 4v6.9l5 2.2v-6.8l-5-2.3Zm7 9.1 5-2.2V9.2l-5 2.3v6.8Z" /></svg>;
  }
  return <svg viewBox="0 0 24 24" fill="currentColor" className={cls}><path d="M11 2h2v3.2a6.9 6.9 0 0 1 2.3 1L17.6 4l1.4 1.4-2.2 2.3a6.9 6.9 0 0 1 1 2.3H21v2h-3.2a6.9 6.9 0 0 1-1 2.3l2.2 2.3-1.4 1.4-2.3-2.2a6.9 6.9 0 0 1-2.3 1V22h-2v-3.2a6.9 6.9 0 0 1-2.3-1L6.4 20l-1.4-1.4 2.2-2.3a6.9 6.9 0 0 1-1-2.3H3v-2h3.2a6.9 6.9 0 0 1 1-2.3L5 7.4 6.4 6l2.3 2.2a6.9 6.9 0 0 1 2.3-1V2Zm1 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" /></svg>;
}

export default function IconTrayNav() {
  const location = useLocation();
  const [openId, setOpenId] = useState<string | null>(null);
  const asideRef = useRef<HTMLElement | null>(null);
  const trayRef = useRef<HTMLDivElement | null>(null);
  const flyoutRef = useRef<HTMLDivElement | null>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [flyoutPos, setFlyoutPos] = useState<{ top: number; left: number; maxHeight: number } | null>(null);
  const [fixedLeft, setFixedLeft] = useState(0);

  const activeSectionId = useMemo(() => {
    for (const section of sections) {
      const sortedLinks = [...section.links].sort(
        (left, right) => normalizePath(right.to).length - normalizePath(left.to).length,
      );
      if (sortedLinks.some((link) => linkMatches(location.pathname, location.search, link.to))) {
        return section.id;
      }
    }
    return null;
  }, [location.pathname, location.search]);

  useEffect(() => {
    const updateFixedLeft = () => {
      const aside = asideRef.current;
      if (!aside) return;
      const rect = aside.getBoundingClientRect();
      setFixedLeft(Math.max(0, Math.round(rect.left)));
    };
    updateFixedLeft();
    window.addEventListener('resize', updateFixedLeft);
    window.addEventListener('scroll', updateFixedLeft, true);
    return () => {
      window.removeEventListener('resize', updateFixedLeft);
      window.removeEventListener('scroll', updateFixedLeft, true);
    };
  }, []);

  useEffect(() => {
    const onDocumentMouseDown = (event: MouseEvent) => {
      const target = event.target as Node | null;
      const clickedInTray = !!(trayRef.current && target && trayRef.current.contains(target));
      const clickedInFlyout = !!(flyoutRef.current && target && flyoutRef.current.contains(target));
      if (!clickedInTray && !clickedInFlyout) {
        setOpenId(null);
      }
    };
    document.addEventListener('mousedown', onDocumentMouseDown);
    return () => document.removeEventListener('mousedown', onDocumentMouseDown);
  }, []);

  useEffect(() => {
    const updateFlyoutPosition = () => {
      if (!openId) {
        setFlyoutPos(null);
        return;
      }
      const button = buttonRefs.current[openId];
      if (!button) return;
      const rect = button.getBoundingClientRect();
      const viewportPadding = 8;
      const isSmallScreen = window.innerWidth < 1100;
      const panelWidth = isSmallScreen ? Math.min(320, window.innerWidth - viewportPadding * 2) : 256;
      const section = sections.find((item) => item.id === openId);
      const linkCount = section?.links.length ?? 0;
      const estimatedPanelHeight = Math.min(
        Math.max(160, 54 + linkCount * 38),
        window.innerHeight - viewportPadding * 2,
      );
      const top = Math.max(
        viewportPadding,
        Math.min(rect.top, window.innerHeight - estimatedPanelHeight - viewportPadding),
      );

      const preferredLeft = isSmallScreen ? rect.left + 4 : rect.right + 6;
      const left = Math.max(
        viewportPadding,
        Math.min(preferredLeft, window.innerWidth - panelWidth - viewportPadding),
      );

      setFlyoutPos({
        top,
        left,
        maxHeight: window.innerHeight - viewportPadding * 2,
      });
    };

    updateFlyoutPosition();
    if (!openId) return;
    window.addEventListener('resize', updateFlyoutPosition);
    window.addEventListener('scroll', updateFlyoutPosition, true);
    return () => {
      window.removeEventListener('resize', updateFlyoutPosition);
      window.removeEventListener('scroll', updateFlyoutPosition, true);
    };
  }, [openId]);

  return (
    <aside ref={asideRef} className="relative h-screen w-[76px]">
      <div ref={trayRef} className="fixed top-0 z-[80] flex h-screen w-[76px] flex-col items-center gap-2 px-2 py-4" style={{ left: fixedLeft }}>
        {sections.map((section) => {
          const isActive = activeSectionId === section.id;
          const isOpen = openId === section.id;
          const accent = accentClasses(section.id);
          return (
            <div key={section.id} className="relative w-full">
              <button
                type="button"
                ref={(node) => {
                  buttonRefs.current[section.id] = node;
                }}
                onClick={() => setOpenId((prev) => (prev === section.id ? null : section.id))}
                className={`group relative flex w-full flex-col items-center overflow-hidden rounded-[18px] border px-2 py-2 text-[11px] font-bold leading-tight transition backdrop-blur-xl ${
                  isActive || isOpen
                    ? 'border-white/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.72),rgba(255,255,255,0.28))] text-sky-900 shadow-[inset_0_1px_1px_rgba(255,255,255,0.95),0_10px_22px_rgba(15,23,42,0.16)]'
                    : 'border-white/45 bg-[linear-gradient(145deg,rgba(255,255,255,0.52),rgba(255,255,255,0.16))] text-slate-700 shadow-[inset_0_1px_1px_rgba(255,255,255,0.75),0_8px_18px_rgba(15,23,42,0.10)] hover:border-white/65 hover:bg-[linear-gradient(145deg,rgba(255,255,255,0.64),rgba(255,255,255,0.22))] hover:text-slate-900'
                }`}
                style={{ backdropFilter: 'saturate(165%) blur(10px)' }}
              >
                <span
                  className={`pointer-events-none absolute inset-0 rounded-[18px] border-2 transition-opacity ${
                    isActive || isOpen ? `opacity-100 ${accent.ring}` : `opacity-0 group-hover:opacity-100 ${accent.ring}`
                  }`}
                />
                <span className={`pointer-events-none absolute -right-2 -top-2 h-6 w-6 rotate-12 rounded-[8px] ${accent.blob} opacity-55 blur-[2px]`} />
                <span className={`mb-1.5 inline-flex h-8 w-8 items-center justify-center rounded-[11px] border border-white/65 bg-gradient-to-br ${accent.chip} shadow-[inset_0_1px_1px_rgba(255,255,255,0.95),0_4px_10px_rgba(15,23,42,0.10)]`}>
                  <TrayIcon name={section.icon} />
                </span>
                <span className="truncate tracking-[0.01em]">{section.label}</span>
                <span
                  className={`pointer-events-none absolute -left-px top-2 h-8 w-[3px] rounded-full transition-opacity ${
                    isActive || isOpen ? `opacity-100 ${accent.rail}` : `opacity-0 group-hover:opacity-100 ${accent.rail}`
                  }`}
                />
              </button>

              {isOpen && flyoutPos
                ? createPortal(
                    <div
                      ref={flyoutRef}
                      className="fixed z-[9999] w-[min(320px,calc(100vw-16px))] overflow-y-auto rounded-2xl border border-white/70 bg-[linear-gradient(155deg,rgba(255,255,255,0.82),rgba(255,255,255,0.28))] p-2 shadow-[inset_0_1px_1px_rgba(255,255,255,0.95),0_12px_28px_rgba(15,23,42,0.16)] backdrop-blur-xl"
                      style={{
                        top: flyoutPos.top,
                        left: flyoutPos.left,
                        maxHeight: flyoutPos.maxHeight,
                        zIndex: 9999,
                        backdropFilter: 'saturate(165%) blur(10px)',
                      }}
                    >
                      <p className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-600">
                        {section.label}
                      </p>
                      <div className="space-y-1">
                        {section.links.map((link) => {
                          const linkActive = linkMatches(location.pathname, location.search, link.to);
                          return (
                            <Link
                              key={link.to}
                              to={link.to}
                              className={`block rounded-xl border px-2 py-2 text-xs transition ${
                                linkActive
                                  ? 'border-sky-500/50 bg-sky-600/90 text-white shadow-sm'
                                  : 'border-white/45 bg-white/35 text-slate-800 hover:border-white/65 hover:bg-white/60'
                              }`}
                            >
                              {link.label}
                            </Link>
                          );
                        })}
                      </div>
                    </div>,
                    document.body,
                  )
                : null}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
