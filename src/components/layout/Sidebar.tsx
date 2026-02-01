import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Mic2, 
  Users, 
  BarChart2, 
  Settings, 
  LogOut 
} from 'lucide-react';

const NavItem = ({ to, icon: Icon, label, active }: { to: string; icon: any; label: string; active: boolean }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
      active
        ? 'bg-[#4C9AFF]/10 text-[#4C9AFF] border border-[#4C9AFF]/20'
        : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
    }`}
  >
    <Icon size={18} className={`${active ? 'text-[#4C9AFF]' : 'text-slate-500 group-hover:text-white transition-colors'}`} />
    {label}
  </Link>
);

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-[#1E212B] border-r border-white/10 flex flex-col hidden md:flex backdrop-blur-md">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#4C9AFF] to-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(76,154,255,0.3)]">
            <Mic2 className="text-white w-6 h-6" />
          </div>
          <div>
            <span className="text-xl font-bold text-white tracking-tight block">VoiceCraft</span>
            <span className="text-xs text-slate-500 font-medium">AI Agent Control</span>
          </div>
        </div>

        <nav className="space-y-1.5">
          <NavItem 
            to="/" 
            active={location.pathname === '/'} 
            label="Dashboard" 
            icon={LayoutDashboard} 
          />
          <NavItem 
            to="/agents" 
            active={location.pathname.startsWith('/agents')} 
            label="My Agents" 
            icon={Users} 
          />
          <NavItem 
            to="/voices" 
            active={location.pathname.startsWith('/voices')} 
            label="Voice Library" 
            icon={Mic2} 
          />
          <NavItem 
            to="/analytics" 
            active={location.pathname.startsWith('/analytics')} 
            label="Analytics" 
            icon={BarChart2} 
          />
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-white/5">
        <nav className="space-y-1.5">
          <NavItem 
            to="/settings" 
            active={location.pathname.startsWith('/settings')} 
            label="Settings" 
            icon={Settings} 
          />
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors group">
            <LogOut size={18} className="text-slate-500 group-hover:text-red-400" />
            Sign Out
          </button>
        </nav>
      </div>
    </aside>
  );
}
