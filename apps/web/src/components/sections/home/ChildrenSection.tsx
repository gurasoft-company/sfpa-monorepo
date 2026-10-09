import { Container } from '@/components/layout/Container';
import { ImageCarousel } from '@/components/sections/ImageCarousel';

const SLIDES = [
  { image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80', alt: "Enfants sensibilisés à l'environnement" },
  { image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&q=80', alt: 'Ateliers pédagogiques nature' },
  { image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=800&q=80', alt: 'Éveil écologique des plus jeunes' },
];

export function ChildrenSection() {
  return (
    <section className="relative py-14 lg:py-16 bg-gray-50">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          {/* Carrousel */}
          <div className="order-2 lg:order-1 relative">
            <div className="relative rounded-xl overflow-hidden shadow-sm ring-1 ring-gray-200">
              <ImageCarousel aspectRatio="aspect-[4/3]" autoPlayMs={4500} slides={SLIDES} />
            </div>
          </div>

          {/* Texte */}
          <div className="order-1 lg:order-2">
            {/* Label */}
            <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sfpa-olive mb-3">
              Éveil des consciences
            </div>

            {/* Titre */}
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 text-sfpa-anthracite leading-tight">
              Éveiller les consciences{' '}
              <span className="text-sfpa-olive">dès l'enfance</span>
            </h2>

            {/* Barre signature */}
            <div className="w-10 h-0.5 bg-sfpa-ocre mb-5" />

            {/* Paragraphes */}
            <div className="space-y-3.5 text-[14.5px] text-gray-600 leading-relaxed">
              <p className="font-medium text-sfpa-anthracite">
                On ne protège bien que ce que l'on comprend. On ne respecte bien que ce que l'on a appris à aimer.
              </p>
              <p>
                SFPA agit auprès des <strong className="text-sfpa-anthracite">enfants d'aujourd'hui</strong> — cette pépinière qui façonnera le monde de demain. Nous les <strong className="text-sfpa-anthracite">sensibilisons et les éduquons</strong> à la conscience environnementale.
              </p>
              <p>
                À travers des ateliers ludiques, des jardins pédagogiques et des rencontres avec des artisans, chaque enfant apprend qu'il n'habite pas "sur" la Terre, mais <strong className="text-sfpa-anthracite">avec</strong> elle.
              </p>
            </div>

            {/* Citation — encadré vert */}
            <div className="mt-6 p-4 rounded-xl bg-sfpa-olive text-white">
              <p className="text-[13.5px] italic leading-relaxed text-white/95">
                Semer dans les consciences d'aujourd'hui, c'est récolter une humanité plus responsable demain.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}