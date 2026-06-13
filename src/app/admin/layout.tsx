'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { signOut } from 'next-auth/react';

const navItems = [
  { href: '/admin/dashboard', label: 'Tableau de bord', icon: 'dashboard' },
  { href: '/admin/pages', label: 'Pages', icon: 'description' },
  { href: '/admin/blog', label: 'Blog', icon: 'article' },
  { href: '/admin/temoignages', label: 'Témoignages', icon: 'reviews' },
  { href: '/admin/contacts', label: 'Contacts', icon: 'mail' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-100">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <Image src="/logo.webp" alt="Madaisy" width={32} height={32} className="w-8 h-8 rounded" />
            <span className="font-bold text-slate-900 text-sm">Madaisy Admin</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span className="material-symbols-outlined text-xl">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
              {session?.user?.name?.[0] || 'A'}
            </div>
            <div className="text-sm">
              <p className="font-medium text-slate-900">{session?.user?.name || 'Admin'}</p>
              <p className="text-slate-400 text-xs">{session?.user?.email}</p>
            </div>
          </div>
          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-red-600 transition-colors w-full"
          >
            <span className="material-symbols-outlined text-lg">logout</span>
            Se déconnecter
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
