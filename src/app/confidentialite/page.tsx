import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de Confidentialité',
  description:
    'Politique de confidentialité de Madaisy Consulting Agency. Découvrez comment nous collectons, utilisons et protégeons vos données personnelles.',
};

export default function Confidentialite() {
  return (
    <>
      {/* ========== HERO ========== */}
      <section className="relative">
        <div
          className="bg-cover bg-center min-h-[280px] flex items-center"
          style={{
            backgroundImage:
              'linear-gradient(135deg, rgba(230, 5, 12, 0.9), rgba(180, 4, 9, 0.95)), url(https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&q=80)',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full text-center text-white">
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Politique de Confidentialité
            </h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              Comment nous collectons, utilisons et protégeons vos données personnelles
            </p>
          </div>
        </div>
      </section>

      {/* ========== CONTENT ========== */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-slate max-w-none space-y-10">
            {/* Introduction */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Introduction</h2>
              <p className="text-slate-600 leading-relaxed">
                MADAISY CONSULTING AGENCY (&quot;nous&quot;, &quot;notre&quot; ou &quot;nos&quot;)
                s&apos;engage à protéger la confidentialité de vos données personnelles. Cette
                politique de confidentialité explique comment nous collectons, utilisons, divulguons
                et protégeons vos informations lorsque vous visitez notre site internet
                <strong> madaisy-consulting.com</strong> ou utilisez nos services.
              </p>
            </div>

            {/* Données collectées */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                2. Données que nous collectons
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Nous pouvons collecter les catégories de données suivantes :
              </p>
              <ul className="list-disc list-inside text-slate-600 mt-2 space-y-2">
                <li>
                  <strong>Données d&apos;identification :</strong> nom, prénom, adresse email,
                  numéro de téléphone que vous nous fournissez via nos formulaires de contact.
                </li>
                <li>
                  <strong>Données de navigation :</strong> adresse IP, type de navigateur, pages
                  visitées, durée de visite (collectées automatiquement).
                </li>
                <li>
                  <strong>Données de communication :</strong> contenu des messages que vous nous
                  adressez via le formulaire de contact ou par email.
                </li>
              </ul>
            </div>

            {/* Finalités */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                3. Finalités du traitement
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Vos données personnelles sont collectées pour les finalités suivantes :
              </p>
              <ul className="list-disc list-inside text-slate-600 mt-2 space-y-2">
                <li>Répondre à vos demandes de renseignements et demandes de devis</li>
                <li>Vous fournir nos services de conseil en orientation académique</li>
                <li>Améliorer l&apos;expérience utilisateur sur notre site</li>
                <li>Respecter nos obligations légales et réglementaires</li>
              </ul>
            </div>

            {/* Base légale */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                4. Base légale du traitement
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Le traitement de vos données repose sur :
              </p>
              <ul className="list-disc list-inside text-slate-600 mt-2 space-y-2">
                <li>Votre consentement explicite lorsque vous remplissez nos formulaires</li>
                <li>L&apos;exécution de mesures précontractuelles (demande de devis)</li>
                <li>Notre intérêt légitime à améliorer nos services</li>
              </ul>
            </div>

            {/* Conservation */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                5. Durée de conservation
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Nous conservons vos données personnelles uniquement pendant la durée nécessaire aux
                finalités pour lesquelles elles ont été collectées :
              </p>
              <ul className="list-disc list-inside text-slate-600 mt-2 space-y-2">
                <li>
                  <strong>Données de contact :</strong> 3 ans à compter du dernier échange
                </li>
                <li>
                  <strong>Données de navigation :</strong> 13 mois maximum
                </li>
                <li>
                  <strong>Données clients :</strong> pendant la durée de la relation contractuelle,
                  puis archivées conformément aux obligations légales
                </li>
              </ul>
            </div>

            {/* Partage */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                6. Partage des données
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Nous ne vendons ni ne louons vos données personnelles à des tiers. Vos données
                peuvent être partagées uniquement avec :
              </p>
              <ul className="list-disc list-inside text-slate-600 mt-2 space-y-2">
                <li>
                  Nos partenaires académiques, uniquement dans le cadre de votre dossier de
                  candidature et avec votre consentement préalable
                </li>
                <li>
                  Nos prestataires techniques (hébergement, email), soumis à des obligations
                  contractuelles de confidentialité
                </li>
                <li>
                  Les autorités compétentes, si la loi l&apos;exige
                </li>
              </ul>
            </div>

            {/* Sécurité */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                7. Sécurité des données
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour
                protéger vos données contre tout accès non autorisé, modification, divulgation ou
                destruction. Ces mesures incluent le chiffrement des communications (HTTPS), des
                contrôles d&apos;accès stricts, et une surveillance continue de nos systèmes.
              </p>
            </div>

            {/* Vos droits */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Vos droits</h2>
              <p className="text-slate-600 leading-relaxed">
                Conformément à la loi n° 2013-450 du 19 juin 2013 relative à la protection des
                données à caractère personnel en Côte d&apos;Ivoire, ainsi qu&apos;au Règlement
                Général sur la Protection des Données (RGPD) pour les résidents de l&apos;Union
                Européenne, vous disposez des droits suivants :
              </p>
              <ul className="list-disc list-inside text-slate-600 mt-2 space-y-2">
                <li><strong>Droit d&apos;accès :</strong> obtenir une copie de vos données</li>
                <li><strong>Droit de rectification :</strong> corriger des données inexactes</li>
                <li><strong>Droit à l&apos;effacement :</strong> demander la suppression de vos données</li>
                <li><strong>Droit d&apos;opposition :</strong> vous opposer au traitement de vos données</li>
                <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
                <li><strong>Droit de retrait du consentement :</strong> à tout moment, sans affecter la licéité du traitement antérieur</li>
              </ul>
              <p className="text-slate-600 leading-relaxed mt-4">
                Pour exercer ces droits, contactez-nous à l&apos;adresse suivante :{' '}
                <strong>contact@madaisy-consulting.com</strong>. Nous nous engageons à répondre dans
                un délai maximum de 30 jours.
              </p>
            </div>

            {/* Cookies */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Cookies</h2>
              <p className="text-slate-600 leading-relaxed">
                Notre site utilise des cookies strictement nécessaires à son bon fonctionnement
                (cookies de session). Nous n&apos;utilisons pas de cookies de tracking publicitaire.
                Vous pouvez configurer votre navigateur pour refuser les cookies, mais certaines
                fonctionnalités du site pourraient être affectées.
              </p>
            </div>

            {/* Modifications */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                10. Modifications de la politique
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Nous nous réservons le droit de modifier cette politique de confidentialité à tout
                moment. Les modifications entreront en vigueur dès leur publication sur cette page.
                Nous vous encourageons à consulter régulièrement cette page.
              </p>
            </div>

            {/* Contact DPO */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Contact</h2>
              <p className="text-slate-600 leading-relaxed">
                Pour toute question relative à cette politique de confidentialité ou à la protection
                de vos données, vous pouvez nous contacter :
              </p>
              <ul className="list-disc list-inside text-slate-600 mt-2 space-y-1">
                <li><strong>Email :</strong> contact@madaisy-consulting.com</li>
                <li><strong>Téléphone :</strong> +225 05 64 48 92 75</li>
                <li><strong>Adresse :</strong> Abidjan, Côte d&apos;Ivoire</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
