import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import api from '../services/api';
import LineChartCard from '../components/LineChartCard';

const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000');

export default function Dashboard() {
  const [markets, setMarkets] = useState([]);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    api.get('/market/markets').then((r) => setMarkets(r.data));
    api.get('/analytics').then((r) => setSummary(r.data.summary)).catch(() => {});
    socket.on('market:update', setMarkets);
    return () => socket.off('market:update', setMarkets);
  }, []);

  const top = markets[0];
  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-4 gap-4">
        <div className="card"><p className="text-slate-400">Tracked Coins</p><p className="text-2xl font-bold">{markets.length}</p></div>
        <div className="card"><p className="text-slate-400">Portfolio Value</p><p className="text-2xl font-bold">${summary?.totalCurrent?.toFixed(2) ?? '0.00'}</p></div>
        <div className="card"><p className="text-slate-400">ROI</p><p className="text-2xl font-bold">{summary?.roi?.toFixed(2) ?? '0.00'}%</p></div>
        <div className="card"><p className="text-slate-400">P/L</p><p className="text-2xl font-bold">${summary?.totalPnl?.toFixed(2) ?? '0.00'}</p></div>
      </div>
      <LineChartCard coin={top} />
      <div className="card overflow-auto"><table className="w-full text-sm"><thead><tr className="text-left text-slate-400"><th>Name</th><th>Price</th><th>24h</th><th>MCap</th></tr></thead><tbody>{markets.map((c)=><tr key={c.id} className="border-t border-slate-800"><td>{c.name} ({c.symbol.toUpperCase()})</td><td>${c.current_price.toLocaleString()}</td><td className={c.price_change_percentage_24h>0?'text-emerald-400':'text-rose-400'}>{c.price_change_percentage_24h?.toFixed(2)}%</td><td>${c.market_cap.toLocaleString()}</td></tr>)}</tbody></table></div>
    </div>
  );
}
