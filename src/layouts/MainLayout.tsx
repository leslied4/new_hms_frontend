import { Outlet } from 'react-router-dom';
import IconTrayNav from '../components/IconTrayNav';
import ProfileQuickMenu from '../components/ProfileQuickMenu';
import PatientFloatingSearch from '../components/PatientFloatingSearch';

export default function MainLayout() {
  return (
    <div className="app-glow-bg min-h-screen bg-slate-50">
      <div className="app-shell-chrome print-hide">
        <PatientFloatingSearch />
      </div>
      <div className="app-shell-chrome print-hide">
        <ProfileQuickMenu />
      </div>
      <div className="mx-auto grid max-w-[1680px] grid-cols-[76px_1fr]">
        <div className="app-shell-chrome print-hide">
          <IconTrayNav />
        </div>
        <main className="app-shell-main min-w-0 px-6 pb-8 pt-20 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
