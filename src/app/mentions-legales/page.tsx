import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentions Légales',
  description:
    'Mentions légales de Madaisy Consulting Agency. Informations légales, éditeur, hébergement et propriété intellectuelle.',
};

export default function MentionsLegales() {
  return (
    <>
      {/* ========== HERO ========== */}
      <section className="relative">
        <div
          className="bg-cover bg-center min-h-[280px] flex items-center"
          style={{
            backgroundImage:
              'linear-gradient(135deg, rgba(230, 5, 12, 0.9), rgba(180, 4, 9, 0.95)), url(https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80)',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full text-center text-white">
            <h1 className="text-4xl md:text-5xl font-black mb-4">Mentions Légales</h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              Informations légales relatives au site Madaisy Consulting Agency
            </p>
          </div>
        </div>
      </section>

      {/* ========== CONTENT ========== */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-slate max-w-none space-y-10">
            {/* Editeur */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Éditeur du site</h2>
              <p className="text-slate-600 leading-relaxed">
                Le site internet <strong>madaisy-consulting.com</strong> est édité par :
              </p>
              <ul className="list-disc list-inside text-slate-600 mt-2 space-y-1">
                <li><strong>Raison sociale :</strong> MADAISY CONSULTING AGENCY</li>
                <li><strong>Forme juridique :</strong> Société à Responsabilité Limitée (SARL)</li>
                <li><strong>Siège social :</strong> Abidjan, Côte d&apos;Ivoire</li>
                <li><strong>Email :</strong> contact@madaisy-consulting.com</li>
                <li><strong>Téléphone :</strong> +225 05 64 48 92 75</li>
                <li><strong>Directeur de la publication :</strong> Le gérant de MADAISY CONSULTING AGENCY</li>
              </ul>
            </div>

            {/* Hébergement */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Hébergement</h2>
              <p className="text-slate-600 leading-relaxed">
                Le site est hébergé par <strong>Vercel Inc.</strong>, situé au 340 S Lemon Ave #4133,
                Walnut, CA 91789, États-Unis.
              </p>
            </div>

            {/* Propriété intellectuelle */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Propriété intellectuelle</h2>
              <p className="text-slate-600 leading-relaxed">
                L&apos;ensemble du contenu présent sur ce site (textes, images, logos, graphismes,
                icônes, etc.) est la propriété exclusive de MADAISY CONSULTING AGENCY, sauf mentions
                contraires. Toute reproduction, distribution, modification, adaptation, retransmission
                ou publication, même partielle, de ces différents éléments est strictement interdite
                sans l&apos;accord exprès par écrit de MADAISY CONSULTING AGENCY.
              </p>
            </div>

            {/* Données personnelles */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Données personnelles</h2>
              <p className="text-slate-600 leading-relaxed">
                Les informations personnelles collectées via le formulaire de contact sont destinées
                exclusivement à MADAISY CONSULTING AGENCY. Conformément à la loi n° 2013-450 du
                19 juin 2013 relative à la protection des données à caractère personnel en Côte
                d&apos;Ivoire, vous disposez d&apos;un droit d&apos;accès, de rectification et de
                suppression des données vous concernant. Pour exercer ce droit, contactez-nous à
                l&apos;adresse : contact@madaisy-consulting.com.
              </p>
            </div>

            {/* Cookies */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Cookies</h2>
              <p className="text-slate-600 leading-relaxed">
                Ce site utilise des cookies strictement nécessaires à son fonctionnement. Aucun cookie
                de tracking publicitaire n&apos;est déposé sans votre consentement. Vous pouvez à tout
                moment paramétrer votre navigateur pour bloquer les cookies.
              </p>
            </div>

            {/* Responsabilité */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Limitation de responsabilité</h2>
              <p className="text-slate-600 leading-relaxed">
                MADAISY CONSULTING AGENCY s&apos;efforce d&apos;assurer l&apos;exactitude et la mise
                à jour des informations diffusées sur ce site. Toutefois, l&apos;éditeur ne saurait
                être tenu responsable des erreurs, omissions ou résultats obtenus par un usage
                inapproprié de ces informations.
              </p>
            </div>

            {/* Liens hypertextes */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Liens hypertextes</h2>
              <p className="text-slate-600 leading-relaxed">
                Le site peut contenir des liens hypertextes vers d&apos;autres sites internet.
                MADAISY CONSULTING AGENCY n&apos;exerce aucun contrôle sur ces sites et décline
                toute responsabilité quant à leur contenu.
              </p>
            </div>

            {/* Droit applicable */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Droit applicable</h2>
              <p className="text-slate-600 leading-relaxed">
                Les présentes mentions légales sont régies par le droit ivoirien. En cas de litige,
                les tribunaux d&apos;Abidjan sont seuls compétents.
              </p>
            </div>

            {/* Mise à jour */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Mise à jour</h2>
              <p className="text-slate-600 leading-relaxed">
                Dernière mise à jour : juin 2026. MADAISY CONSULTING AGENCY se réserve le droit de
                modifier les présentes mentions légales à tout moment.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
