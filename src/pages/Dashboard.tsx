import { ArrowUpRight, Play, Activity, Users, Zap } from 'lucide-react';

const StatCard = ({ title, value, change, icon: Icon, trend }: any) => (
  <div className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-2xl p-6 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 group">
    <div className="flex items-start justify-between mb-4">
      <div className="p-3 rounded-xl bg-[#4C9AFF]/10 text-[#4C9AFF] group-hover:bg-[#4C9AFF] group-hover:text-white transition-colors duration-300">
        <Icon size={24} />
      </div>
      <div className={`flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full ${trend === 'up' ? 'text-emerald-400 bg-emerald-400/10' : 'text-red-400 bg-red-400/10'}`}>
        {change}
        <ArrowUpRight size={14} />
      </div>
    </div>
    <h3 className="text-slate-400 text-sm font-medium mb-1">{title}</h3>
    <div className="text-3xl font-bold text-white/90">{value}</div>
  </div>
);

const ActivityItem = ({ title, time, type }: any) => (
  <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 group">
    <div className={`w-2 h-2 rounded-full ${type === 'success' ? 'bg-emerald-500' : type === 'warning' ? 'bg-amber-500' : 'bg-[#4C9AFF]'}`}></div>
    <div className="flex-1">
      <h4 className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">{title}</h4>
      <p className="text-xs text-slate-500">{time}</p>
    </div>
    <button className="text-xs font-medium text-[#4C9AFF] opacity-0 group-hover:opacity-100 transition-opacity hover:underline">
      View
    </button>
  </div>
);

export default function Dashboard() {
  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white/90 mb-2">
            Dashboard
          </h1>
          <p className="text-lg text-slate-400">
            Overview of your voice agents and performance.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 rounded-lg border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white transition-all font-medium text-sm">
            Export Report
          </button>
          <button className="px-5 py-2.5 rounded-lg bg-[#4C9AFF] text-white hover:bg-blue-600 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-blue-500/25 font-medium text-sm flex items-center gap-2">
            <Zap size={16} />
            Create New Agent
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Active Agents" 
          value="12" 
          change="+24%" 
          trend="up" 
          icon={Users} 
        />
        <StatCard 
          title="Voice Generations" 
          value="8,542" 
          change="+12%" 
          trend="up" 
          icon={Play} 
        />
        <StatCard 
          title="Avg. Response Time" 
          value="1.2s" 
          change="-8%" 
          trend="up" 
          icon={Zap} 
        />
        <StatCard 
          title="API Usage" 
          value="84%" 
          change="+4%" 
          trend="down" 
          icon={Activity} 
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Activity Panel */}
        <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-2xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold tracking-tight text-white/90">Recent Activity</h2>
            <select className="bg-black/20 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-slate-400 focus:outline-none focus:border-[#4C9AFF]">
              <option>Last 24 Hours</option>
              <option>Last 7 Days</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <ActivityItem 
              title="Customer Support Bot generated 450 responses" 
              time="2 minutes ago" 
              type="success" 
            />
            <ActivityItem 
              title="Sales Agent V2 triggered a high latency warning" 
              time="1 hour ago" 
              type="warning" 
            />
            <ActivityItem 
              title="New voice 'Sarah - Professional' added to library" 
              time="3 hours ago" 
              type="info" 
            />
            <ActivityItem 
              title="Billing threshold reached for current plan" 
              time="5 hours ago" 
              type="warning" 
            />
            <ActivityItem 
              title="Weekly analytics report generated" 
              time="1 day ago" 
              type="success" 
            />
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-gradient-to-b from-[#4C9AFF]/20 to-blue-900/10 backdrop-blur-xl border border-[#4C9AFF]/20 rounded-2xl p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#4C9AFF]/20 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity duration-500 group-hover:opacity-75"></div>
            
            <h3 className="text-xl font-bold text-white mb-2 relative z-10">Upgrade Plan</h3>
            <p className="text-slate-300 text-sm mb-6 relative z-10">
              Unlock unlimited voice generations and advanced analytics features.
            </p>
            <button className="w-full py-3 rounded-xl bg-white text-[#1E212B] font-bold text-sm hover:shadow-lg hover:shadow-white/10 hover:scale-[1.02] transition-all relative z-10">
              Upgrade to Pro
            </button>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white/90 mb-4">System Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Voice Engine</span>
                <span className="flex items-center gap-2 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Operational
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">API Gateway</span>
                <span className="flex items-center gap-2 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Operational
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Database</span>
                <span className="flex items-center gap-2 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Operational
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
