import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function AppShell() {
  return (
    <div className="flex h-screen bg-[#1E212B] text-slate-300 font-sans overflow-hidden selection:bg-[#4C9AFF] selection:text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 relative z-0">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          <div className="container mx-auto max-w-7xl animate-in fade-in duration-500">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
