'use client';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn('credentials', { email, password, redirect: false });
    if (result?.error) setError('Identifiants incorrects');
    else router.push('/admin/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Administration Madaisy</h1>
        {error && <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 border rounded-lg" required />
          <input type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-3 border rounded-lg" required />
          <button type="submit" className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark">Se connecter</button>
        </form>
        <div className="mt-6 p-4 bg-blue-50 rounded text-sm text-blue-700">
          <strong>Démo :</strong> admin@madaisy-consulting.com / admin123
        </div>
      </div>
    </div>
  );
}