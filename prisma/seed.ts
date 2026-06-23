import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

async function main() {
  // ── Admin ──
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@madaisy-consulting.com' },
    update: {},
    create: { email: 'admin@madaisy-consulting.com', password: hashedPassword, name: 'Admin', role: 'admin' },
  });

  // ── Site Settings ──
  await prisma.siteSettings.upsert({
    where: { id: 'settings' }, update: {},
    create: { siteName: 'Madaisy Consulting Agency', phone: '+225 05 64 48 92 75', email: 'contact@madaisy-consulting.com', whatsapp: '+2250564489275', address: "Abidjan, Cote d'Ivoire" },
  });

  // ── Témoignages ──
  const temoignages = [
    { name: 'Sarah M.', role: 'Master en Intelligence Artificielle — France', content: "Grâce à Madaisy, j'ai pu obtenir mon admission et mon visa en un temps record. Leur aide pour l'installation à Lyon a été cruciale pour mon intégration. Ils ont vraiment pensé à tout, du logement aux démarches administratives.", rating: 5 },
    { name: 'Kévin L.', role: 'Bachelor Business International — Canada', content: "Une équipe professionnelle et à l'écoute. Ils ne m'ont pas seulement aidé pour les papiers, ils m'ont vraiment conseillé sur le choix de mon université. Aujourd'hui je suis dans le programme de mes rêves grâce à leur orientation stratégique.", rating: 5 },
    { name: 'Amélie R.', role: 'Médecine — France', content: "Le suivi post-admission est incroyable. Madaisy m'a aidé à trouver mon logement et à gérer toutes mes formalités administratives avant même mon arrivée ! Je me suis sentie épaulée à chaque étape.", rating: 5 },
  ];

  for (const t of temoignages) {
    await prisma.testimonial.upsert({
      where: { id: `seed-${t.name.toLowerCase().replace(/[^a-z]/g, '-')}` },
      update: t,
      create: { id: `seed-${t.name.toLowerCase().replace(/[^a-z]/g, '-')}`, ...t, published: true },
    });
  }

  // ── Articles de blog ──
  const articles = [
    {
      slug: 'dossier-campus-france-guide-ultime',
      title: 'Préparer son dossier Campus France : Le guide ultime 2025',
      excerpt: "Tout ce qu'il faut savoir pour constituer un dossier Campus France irréprochable et maximiser vos chances d'admission dans l'enseignement supérieur français.",
      category: 'Guide',
      author: 'Madaisy Team',
      readTime: 7,
      coverImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=80',
      content: JSON.stringify({
        introduction: "La procédure Campus France est l'étape incontournable pour tout étudiant étranger souhaitant poursuivre ses études en France. Elle peut sembler complexe, mais avec une bonne préparation et les bons conseils, vous mettrez toutes les chances de votre côté. Voici notre guide complet pour constituer un dossier qui fera la différence.",
        sections: [
          {
            heading: '1. Comprendre le calendrier Campus France',
            body: ["La première chose à faire est de bien connaître les dates clés. La campagne Campus France débute généralement en octobre et se termine en décembre pour la plupart des pays d'Afrique francophone. Ne vous y prenez pas au dernier moment : certaines formations très demandées affichent complet dès le mois de janvier.", "Le calendrier type est le suivant : dépôt du dossier entre octobre et décembre, entretien pédagogique entre janvier et mars, réponse des établissements entre mars et mai, puis procédure de visa à partir de juin."],
            list: ['Octobre - Décembre : Constitution et dépôt du dossier', 'Janvier - Mars : Entretien pédagogique Campus France', 'Mars - Mai : Réponses des établissements', 'Juin - Août : Demande de visa étudiant']
          },
          {
            heading: '2. Les documents indispensables',
            body: ["Votre dossier Campus France doit contenir un certain nombre de pièces justificatives. Chaque document doit être scanné en couleur, lisible et au format PDF. Voici la liste complète des documents à préparer :"],
            list: ['Relevés de notes du baccalauréat', 'Diplôme du baccalauréat ou attestation de réussite', 'Relevés de notes des années post-bac (le cas échéant)', "Lettre de motivation (une par formation demandée)", 'Curriculum Vitae détaillé', 'Copie du passeport (pages d\'identité)', 'Photo d\'identité récente', "Justificatif de paiement des frais Campus France"]
          },
          {
            heading: "3. La lettre de motivation : l'élément clé",
            body: ["C'est souvent le document qui fait la différence. Une bonne lettre de motivation doit être personnalisée pour chaque formation et chaque établissement. Elle doit montrer que vous avez fait des recherches sur la formation et l'université visées.", "Structurez votre lettre en trois parties : présentez-vous et expliquez votre parcours, démontrez votre intérêt pour la formation spécifique, et exposez votre projet professionnel. Soyez concret : citez des modules du programme qui vous intéressent, mentionnez des professeurs dont les travaux vous inspirent."]
          },
          {
            heading: "4. L'entretien pédagogique",
            body: ["L'entretien avec le conseiller Campus France est une étape décisive. Il dure généralement 20 à 30 minutes et vise à évaluer la cohérence de votre projet d'études. Préparez-vous à répondre à des questions sur votre parcours, vos motivations et votre projet professionnel.", "Nos conseils : soyez ponctuel, habillez-vous de façon professionnelle, apportez tous vos documents originaux, et surtout, soyez honnête. Les conseillers savent repérer les projets peu aboutis. Si vous avez des lacunes dans votre dossier, expliquez comment vous comptez les combler."]
          }
        ],
        conclusion: "Le dossier Campus France est votre porte d'entrée vers les études en France. Prenez le temps de le préparer minutieusement. Si vous avez des doutes, n'hésitez pas à vous faire accompagner par des professionnels. Avec Madaisy Consulting Agency, nous vous guidons à chaque étape pour maximiser vos chances de succès."
      })
    },
    {
      slug: 'vie-etudiante-paris-budget-bons-plans',
      title: 'La vie étudiante à Paris : Budget, astuces et bons plans',
      excerpt: "Découvrez comment profiter de la capitale sans vous ruiner : transports, logement, sorties et culture. Le guide complet pour les étudiants.",
      category: 'Lifestyle',
      author: 'Sarah M.',
      readTime: 8,
      coverImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80',
      content: JSON.stringify({
        introduction: "Paris est une ville magnifique, mais elle a la réputation d'être chère. Pourtant, avec les bonnes astuces et un peu d'organisation, il est tout à fait possible de vivre confortablement dans la capitale avec un budget étudiant. Voici nos conseils pour maîtriser votre budget et profiter pleinement de votre vie parisienne.",
        sections: [
          {
            heading: 'Le logement : la dépense principale',
            body: ["Le logement représente généralement 40 à 50% du budget d'un étudiant à Paris. Les résidences CROUS sont les plus économiques (200-400€/mois) mais les places sont limitées. Les colocations sont une excellente alternative : comptez entre 500 et 700€ pour une chambre en colocation dans Paris intra-muros.", "L'astuce Madaisy : n'hésitez pas à chercher en petite couronne (Montreuil, Ivry, Montrouge...). Les loyers y sont 20 à 30% moins chers et le métro vous amène dans Paris en 15-20 minutes. Pensez également aux résidences étudiantes privées qui proposent des studios meublés avec charges comprises."],
            list: ['Résidence CROUS : 200-400€/mois', 'Colocation Paris intra-muros : 500-700€/mois', 'Studio petite couronne : 450-650€/mois', 'Résidence privée : 600-900€/mois (charges incluses)']
          },
          {
            heading: 'Transport : les bons réflexes',
            body: ["Le pass Navigo étudiant Imagine R est votre meilleur allié. Pour 350€ par an (soit moins de 30€ par mois), vous avez un accès illimité à tous les transports en commun d'Île-de-France : métro, RER, bus et tramway. Une économie considérable par rapport au tarif normal.", "Pour les trajets courts, pensez au Vélib' (vélo en libre-service) : seulement 2,40€ par mois pour les 18-25 ans. Et si vous habitez à moins de 30 minutes à pied de votre campus, la marche reste la meilleure option : gratuite et bonne pour la santé !"]
          },
          {
            heading: 'Se nourrir sans se ruiner',
            body: ["Le restaurant universitaire (RU) est votre meilleur ami : 3,30€ le repas complet (1€ pour les boursiers). Avec plus de 400 restaurants en Île-de-France, il y en a forcément un près de votre campus. Pour les repas maison, privilégiez les marchés de quartier en fin de journée pour les bonnes affaires, et les applications anti-gaspi comme Too Good To Go.", "Le budget alimentation mensuel recommandé est de 200 à 300€. En cuisinant vous-même et en profitant des RU, vous pouvez facilement rester dans la fourchette basse."]
          }
        ],
        conclusion: "Avec un budget total d'environ 900 à 1200€ par mois, il est tout à fait possible de vivre confortablement à Paris en tant qu'étudiant. Le secret est d'anticiper et de connaître les bonnes adresses et les aides disponibles. Bon séjour dans la plus belle ville du monde !"
      })
    },
    {
      slug: 'aides-caf-logement-etudiant',
      title: 'Trouver un logement étudiant : Les aides de la CAF expliquées simplement',
      excerpt: "Comprendre les APL, l'ALS et les différentes solutions d'hébergement pour les étudiants étrangers. Un guide pratique et accessible.",
      category: 'Pratique',
      author: 'Madaisy Team',
      readTime: 6,
      coverImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80',
      content: JSON.stringify({
        introduction: "La recherche de logement est souvent la plus grande source de stress pour les étudiants qui arrivent en France. Entre la pénurie de logements dans certaines villes, la paperasse administrative et le budget serré, il y a de quoi se sentir dépassé. Respirez : on vous explique tout sur les aides au logement de la CAF et comment les obtenir.",
        sections: [
          {
            heading: "APL, ALS, ALF : quelles différences ?",
            body: ["La CAF (Caisse d'Allocations Familiales) propose trois types d'aides au logement. L'APL (Aide Personnalisée au Logement) est la plus avantageuse : elle concerne les logements conventionnés (résidences CROUS, résidences étudiantes privées conventionnées). L'ALS (Allocation de Logement Sociale) concerne les autres types de logements (studio privé, colocation, chambre chez l'habitant).", "En tant qu'étudiant étranger, vous êtes éligible à ces aides à partir du moment où vous avez un titre de séjour valide (ou un visa long séjour valant titre de séjour - VLS-TS). C'est une excellente nouvelle !"]
          },
          {
            heading: 'Combien pouvez-vous toucher ?',
            body: ["Le montant des aides dépend de plusieurs facteurs : vos revenus, le montant du loyer, la localisation du logement (Paris et région parisienne ont des barèmes plus élevés), et votre situation familiale.", "Pour vous donner une idée, un étudiant seul sans revenus dans un studio à 500€ à Paris peut prétendre à environ 200-250€ d'APL par mois. À Lyon, pour le même loyer, comptez environ 150-200€. C'est une aide substantielle qui peut réduire votre loyer de 30 à 50% !"]
          },
          {
            heading: 'Comment faire la demande ?',
            body: ["La demande se fait entièrement en ligne sur le site de la CAF (caf.fr). Créez votre compte, remplissez le formulaire avec vos informations personnelles, votre situation et les détails de votre logement. Vous aurez besoin de votre numéro de sécurité sociale (ou numéro CAF provisoire si vous n'en avez pas), de votre titre de séjour, de votre bail ou contrat de location, et d'un RIB.", "L'astuce Madaisy : faites la demande dès votre emménagement, car l'aide n'est pas rétroactive au-delà du mois en cours. Chaque mois perdu est de l'argent en moins !"]
          }
        ],
        conclusion: "Les aides au logement sont un véritable coup de pouce pour les étudiants. Ne passez pas à côté : elles peuvent représenter plusieurs centaines d'euros d'économies par mois. Si vous avez besoin d'aide pour constituer votre dossier, l'équipe Madaisy est là pour vous accompagner."
      })
    },
    {
      slug: 'budget-mensuel-etudiant-france',
      title: 'Budget mensuel type pour étudier en France en 2025',
      excerpt: "Estimation réaliste des dépenses mensuelles : logement, nourriture, transport, loisirs. Comparez Paris vs Province et planifiez votre budget sereinement.",
      category: 'Argent',
      author: 'Sarah M.',
      readTime: 5,
      coverImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80',
      content: JSON.stringify({
        introduction: "Combien coûte vraiment la vie étudiante en France ? C'est la question que se posent tous les futurs étudiants. Pour vous aider à planifier votre budget, nous avons compilé les dépenses moyennes d'un étudiant en France, en distinguant Paris de la province. Ces chiffres sont basés sur les données 2025 de l'Observatoire de la Vie Étudiante.",
        sections: [
          {
            heading: 'Budget mensuel à Paris',
            body: ["La vie à Paris est plus chère que dans le reste de la France, mais les opportunités académiques et professionnelles y sont aussi plus nombreuses. Voici le détail d'un budget mensuel type pour un étudiant parisien."],
            list: ['Logement (colocation) : 550-700€', 'Alimentation : 250-350€', 'Transport : 30€ (Imagine R)', 'Téléphone/Internet : 20-40€', 'Loisirs : 100-200€', 'Divers (vêtements, santé) : 50-100€', 'TOTAL : environ 1000-1400€/mois']
          },
          {
            heading: 'Budget mensuel en province (Lyon, Bordeaux, Lille...)',
            body: ["La province offre un cadre de vie souvent plus abordable sans sacrifier la qualité des études. Les universités de Lyon, Bordeaux, Lille ou Toulouse sont excellentes et le coût de la vie y est sensiblement inférieur à Paris."],
            list: ['Logement (studio ou coloc) : 350-500€', 'Alimentation : 200-300€', 'Transport : 20-30€', 'Téléphone/Internet : 20-40€', 'Loisirs : 80-150€', 'Divers (vêtements, santé) : 50-100€', 'TOTAL : environ 750-1100€/mois']
          },
          {
            heading: 'Les aides financières à ne pas manquer',
            body: ["Plusieurs dispositifs peuvent alléger votre budget. Les bourses du gouvernement français (CROUS) sont accessibles aux étudiants étrangers sous conditions. Les aides au logement (APL) réduisent votre loyer de 20 à 50%. De nombreuses universités proposent également des fonds de solidarité pour les étudiants en difficulté financière.", "Enfin, sachez que les étudiants étrangers ont le droit de travailler jusqu'à 964 heures par an (environ 20h/semaine), ce qui peut représenter un revenu de 8000 à 10000€ annuels avec le SMIC."]
          }
        ],
        conclusion: "Étudier en France représente un investissement conséquent, mais les aides financières disponibles et la possibilité de travailler rendent ce projet accessible. Planifiez votre budget avant de partir, prévoyez une marge de sécurité, et n'hésitez pas à solliciter les aides auxquelles vous avez droit."
      })
    },
    {
      slug: 'lettre-motivation-percutante',
      title: 'Rédiger une lettre de motivation qui fait la différence : la méthode en 4 étapes',
      excerpt: "Comment structurer votre lettre de motivation pour convaincre les commissions pédagogiques des universités françaises. Modèle et exemples inclus.",
      category: 'Rédaction',
      author: 'Madaisy Team',
      readTime: 7,
      coverImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&q=80',
      content: JSON.stringify({
        introduction: "La lettre de motivation est bien plus qu'une formalité administrative : c'est votre chance de vous démarquer parmi des centaines de candidats. Les commissions pédagogiques des universités françaises lisent chaque lettre avec attention. Voici notre méthode en 4 étapes pour rédiger une lettre qui marquera les esprits.",
        sections: [
          {
            heading: 'Étape 1 : La recherche préalable',
            body: ["Avant même d'écrire un mot, faites vos devoirs. Étudiez en détail le programme de la formation : quels sont les cours proposés ? Qui sont les professeurs ? Quels sont les débouchés ? Qu'est-ce qui rend cette formation unique par rapport aux autres ?", "Plus votre lettre montrera une connaissance précise de la formation, plus vous serez crédible. Mentionnez des modules spécifiques qui vous intéressent, des projets de recherche du département, ou des partenariats avec des entreprises."]
          },
          {
            heading: "Étape 2 : La structure gagnante",
            body: ["Une bonne lettre de motivation suit une structure claire. Elle fait généralement une page, soit environ 400 à 600 mots. Voici le plan à suivre :"],
            list: ['Paragraphe 1 — Vous : Présentez-vous brièvement, votre parcours, ce qui vous a conduit à postuler', "Paragraphe 2 — La formation : Montrez que vous connaissez précisément le programme et expliquez pourquoi il vous correspond", "Paragraphe 3 — Le projet : Décrivez votre projet professionnel et comment cette formation s'y inscrit", "Paragraphe 4 — La contribution : Expliquez ce que vous pouvez apporter à la formation et à l'université"]
          },
          {
            heading: "Étape 3 : Les formules qui marchent",
            body: ["Soyez personnel et authentique. Évitez les formules toutes faites comme « Je suis très motivé » ou « Votre formation est excellente ». Montrez votre motivation par des faits concrets plutôt que par des adjectifs.", "Quelques exemples de phrases d'accroche efficaces : « Mon stage de trois mois au sein du département marketing de X m'a fait prendre conscience que... », « La lecture de l'article du Professeur Y sur le sujet Z a renforcé ma conviction que... », « Ayant grandi dans un environnement multiculturel, je suis particulièrement sensible à... »"]
          },
          {
            heading: 'Étape 4 : La relecture et la personnalisation',
            body: ["Ne faites pas l'erreur d'envoyer la même lettre à toutes les formations. Chaque lettre doit être personnalisée. Une commission pédagogique repère immédiatement une lettre générique.", "Faites relire votre lettre par au moins deux personnes différentes : un ami pour la clarté, un enseignant pour le contenu académique. Vérifiez l'orthographe et la grammaire avec un correcteur. Une faute d'orthographe dans une lettre de motivation peut être rédhibitoire."]
          }
        ],
        conclusion: "Une lettre de motivation réussie, c'est celle qui donne envie au lecteur de vous rencontrer. Elle doit raconter une histoire — la vôtre — de manière convaincante et professionnelle. Si vous avez besoin d'aide pour rédiger ou relire votre lettre, Madaisy Consulting Agency propose un service de coaching personnalisé."
      })
    }
  ];

  for (const a of articles) {
    await prisma.blogPost.upsert({
      where: { slug: a.slug },
      update: a,
      create: { ...a, published: true },
    });
  }

  console.log('✅ Seed terminé : admin, 4 témoignages, 6 articles de blog');
}

main().catch(console.error).finally(() => prisma.$disconnect());
