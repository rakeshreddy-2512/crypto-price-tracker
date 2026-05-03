import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AuthPage() {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const submit = async (e) => {
    e.preventDefault();
    if (isLogin) await login({ email: form.email, password: form.password });
    else await register(form);
  };

  return <div className="min-h-screen grid place-content-center"><form onSubmit={submit} className="card w-96 space-y-3"><h1 className="text-xl font-bold">{isLogin ? 'Sign In' : 'Create Account'}</h1>{!isLogin && <input className="w-full p-2 rounded bg-slate-800" placeholder="Name" onChange={(e)=>setForm({...form,name:e.target.value})} />}<input className="w-full p-2 rounded bg-slate-800" placeholder="Email" type="email" onChange={(e)=>setForm({...form,email:e.target.value})} /><input className="w-full p-2 rounded bg-slate-800" placeholder="Password" type="password" onChange={(e)=>setForm({...form,password:e.target.value})} /><button className="w-full bg-cyan-500 py-2 rounded">Continue</button><button type="button" onClick={()=>setIsLogin(!isLogin)} className="text-cyan-400 text-sm">{isLogin ? 'Need an account?' : 'Already have an account?'}</button></form></div>;
}
