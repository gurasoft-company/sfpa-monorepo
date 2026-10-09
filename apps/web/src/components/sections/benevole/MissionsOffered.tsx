import { Wrench, HeartPulse, ClipboardList, Languages, Package, Users } from 'lucide-react';
import { Container } from '@/components/layout/Container';

const MISSIONS = [
  {
    icon: Wrench,
    title: 'Formateur technique',
    text: 'Agriculture, agroécologie, mécanique auto, bâtiment, énergie solaire, design intérieur, artisanat…',
  },
  {
    icon: HeartPulse,
    title: 'Professionnel de santé',
    text: 'Médecins, infirmiers, sages-femmes, spécialistes : consultations, dépistages, formation du personnel local.',
  },
  {
    icon: Languages,
    title: 'Enseignant de langues',
    text: 'Transmettez les langues africaines (wolof, bambara, éwé…) à ceux qui se préparent à retourner aux sources.',
  },
  {
    icon: Package,
    title: 'Logistique & collecte',
    text: 'Collecte de matériel, transport, gestion des expéditions vers l\'Afrique.',
  },
  {
    icon: ClipboardList,
    title: 'Aide administrative',
    text: 'Comptabilité, communication, rédaction de dossiers de subvention, traduction.',
  },
  {
    icon: Users,
    title: 'Accompagnement',
    text: 'Mentorat, suivi des jeunes formés, aide à la création d\'activité après la formation.',
  },
];

export function MissionsOffered() {
  return (
    <section className="relative py-14 lg:py-16 bg-gray-50">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sfpa-olive mb-3">
            Missions proposées
          </div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-sfpa-anthracite mb-3 leading-tight">
            Trouvez votre <span className="text-sfpa-olive">mission</span>
          </h2>
          <div className="w-10 h-0.5 bg-sfpa-ocre mx-auto mb-4" />
          <p className="text-sm text-gray-600 leading-relaxed">
            Chaque savoir-faire compte. Choisissez la mission qui correspond
            à vos compétences et à votre disponibilité.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {MISSIONS.map((mission, i) => {
            const Icon = mission.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 hover:border-sfpa-olive/30 hover:shadow-md transition-all duration-300 p-6 flex flex-col"
              >
                <div className="w-11 h-11 rounded-full bg-sfpa-olive/10 text-sfpa-olive flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-[15px] font-bold text-sfpa-olive mb-2 leading-snug">
                  {mission.title}
                </h3>
                <p className="text-[13px] text-gray-500 leading-relaxed flex-grow">
                  {mission.text}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}