import { Routes, Route } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppShell />}>
        <Route index element={<Dashboard />} />
        {/* Placeholder routes for future expansion */}
        <Route path="agents" element={<div className="p-10 text-slate-400">Agents Module Coming Soon</div>} />
        <Route path="voices" element={<div className="p-10 text-slate-400">Voice Library Coming Soon</div>} />
        <Route path="analytics" element={<div className="p-10 text-slate-400">Analytics Module Coming Soon</div>} />
        <Route path="settings" element={<div className="p-10 text-slate-400">Settings Module Coming Soon</div>} />
      </Route>
    </Routes>
  );
}
