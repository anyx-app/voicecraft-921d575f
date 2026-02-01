import { Bell, Search, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-16 border-b border-white/5 bg-[#1E212B]/50 backdrop-blur-sm sticky top-0 z-10 px-8 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        {/* Mobile menu trigger could go here */}
        <div className="relative group max-w-md w-full hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#4C9AFF] transition-colors" />
          <input 
            type="text" 
            placeholder="Search agents, voices, or analytics..." 
            className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-[#4C9AFF] focus:border-[#4C9AFF]/50 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-all relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#1E212B]"></span>
        </button>
        
        <div className="h-8 w-[1px] bg-white/10 mx-2"></div>
        
        <button className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10 transition-all">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-600 flex items-center justify-center text-xs font-bold text-white ring-2 ring-white/10">
            JD
          </div>
          <span className="text-sm font-medium text-slate-300 pr-2 hidden sm:block">John Doe</span>
        </button>
      </div>
    </header>
  );
}
