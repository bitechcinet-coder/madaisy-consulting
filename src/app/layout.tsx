import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  metadataBase: new URL('https://madaisy-consulting.com'),
  title: {
    default: 'Madaisy Consulting Agency — Étudiez en France avec sérénité',
    template: '%s | Madaisy Consulting Agency',
  },
  description:
    'Agence spécialisée dans l\'accompagnement à la mobilité internationale étudiante vers la France. 100% de réussite depuis 2024. Orientation, admission, installation.',
  keywords: ['études France', 'mobilité internationale', 'Campus France', 'étudiant', 'orientation', 'visa étudiant', 'Madaisy'],
  authors: [{ name: 'Madaisy Consulting Agency' }],
  openGraph: {
    title: 'Madaisy Consulting Agency — Étudiez en France avec sérénité',
    description: 'Accompagnement sur mesure pour votre mobilité internationale. De l\'orientation à l\'installation.',
    url: 'https://madaisy-consulting.com',
    siteName: 'Madaisy Consulting Agency',
    locale: 'fr_FR',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
        <link rel="icon" href="/logo.webp" type="image/webp" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Madaisy Consulting Agency',
              alternateName: 'Madaisy Consulting',
              url: 'https://madaisy-consulting.com',
              logo: 'https://madaisy-consulting.com/logo.png',
              description:
                "Agence spécialisée dans l'accompagnement à la mobilité internationale étudiante vers la France. Orientation, admission, installation.",
              foundingDate: '2024',
              founder: {
                '@type': 'Person',
                name: 'Marie-Désirée Tanoh',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'customer service',
                telephone: '+225 07 00 00 00 00',
                availableLanguage: ['French'],
              },
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'CI',
                addressLocality: 'Abidjan',
              },
              sameAs: [
                'https://www.facebook.com/madaisyconsulting',
                'https://www.instagram.com/madaisyconsulting',
                'https://www.linkedin.com/company/madaisy-consulting',
                'https://www.tiktok.com/@madaisyconsulting',
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} font-display`}>
        <Providers>
          <Header />
          <main className="pt-20">{children}</main>
          <Footer />
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}
