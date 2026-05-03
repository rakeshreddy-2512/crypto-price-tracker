import { useEffect, useState } from 'react';
import api from '../services/api';

export default function Portfolio() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ coinId: 'bitcoin', symbol: 'btc', quantity: 0, buyPrice: 0 });

  const load = () => api.get('/portfolio').then((r) => setItems(r.data)).catch(() => setItems([]));
  useEffect(() => { load(); }, []);

  const add = async (e) => { e.preventDefault(); await api.post('/portfolio', form); setForm({ coinId: '', symbol: '', quantity: 0, buyPrice: 0 }); load(); };
  const remove = async (id) => { await api.delete(`/portfolio/${id}`); load(); };

  return <div className="space-y-4"><form onSubmit={add} className="card grid md:grid-cols-5 gap-2">{['coinId','symbol','quantity','buyPrice'].map((f)=><input key={f} required className="bg-slate-800 rounded p-2" placeholder={f} value={form[f]} onChange={(e)=>setForm({...form,[f]:e.target.value})} />)}<button className="bg-cyan-500 rounded px-3">Add Asset</button></form><div className="card"><h2 className="font-semibold mb-2">Holdings</h2>{items.map((i)=><div key={i.id} className="flex justify-between border-t border-slate-800 py-2"><span>{i.symbol.toUpperCase()} - {i.quantity} @ ${i.buyPrice}</span><button onClick={()=>remove(i.id)} className="text-rose-400">Delete</button></div>)}</div></div>;
}
