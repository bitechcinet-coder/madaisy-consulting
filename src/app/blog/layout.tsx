import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Actualités et conseils pour vos études en France. Dossier Campus France, vie étudiante, logement, visas et démarches.',
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
