import { GraduationCap, Building2, Landmark, Heart } from 'lucide-react';
import { Container } from '@/components/layout/Container';

const TYPES = [
  {
    icon: GraduationCap,
    title: 'Écoles & universités',
    text: "Stages, projets pédagogiques, sensibilisation des jeunes à l'engagement solidaire et environnemental.",
  },
  {
    icon: Building2,
    title: 'Entreprises',
    text: "Mécénat, dons de matériel, transmission de compétences par vos collaborateurs, accueil de stagiaires.",
  },
  {
    icon: Landmark,
    title: 'Collectivités',
    text: "Soutien institutionnel, subventions, mise à disposition de locaux et de moyens logistiques.",
  },
  {
    icon: Heart,
    title: 'Associations',
    text: "Partenariats opérationnels, co-construction de projets, mutualisation des moyens et des réseaux.",
  },
];

export function PartnerBenefits() {
  return (
    <section className="relative py-12 lg:py-14 bg-gray-50">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sfpa-olive mb-3">
            Pourquoi nous rejoindre
          </div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-sfpa-anthracite mb-3 leading-tight">
            Un partenariat <span className="text-sfpa-olive">sur mesure</span>
          </h2>
          <div className="w-10 h-0.5 bg-sfpa-ocre mx-auto mb-4" />
          <p className="text-sm text-gray-600 leading-relaxed">
            Chaque partenaire apporte sa spécificité. Ensemble, nous construisons
            des projets qui ont un impact réel sur le terrain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {TYPES.map((type, i) => {
            const Icon = type.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-100 hover:border-sfpa-olive/30 hover:shadow-md transition-all duration-300 p-6 flex flex-col text-center"
              >
                <div className="w-12 h-12 rounded-full bg-sfpa-olive text-white flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-[15px] font-bold text-sfpa-olive mb-2 leading-snug">
                  {type.title}
                </h3>
                <p className="text-[13px] text-gray-500 leading-relaxed flex-grow">
                  {type.text}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}