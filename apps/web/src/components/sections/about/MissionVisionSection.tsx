import { Target, Eye } from 'lucide-react';
import { Container } from '@/components/layout/Container';

export function MissionVisionSection() {
  return (
    <section className="relative py-14 lg:py-16 bg-white">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sfpa-olive mb-3">
            Notre raison d'être
          </div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-sfpa-anthracite mb-3 leading-tight">
            Une conviction : <span className="text-sfpa-olive">l'Homme et la Terre</span>
          </h2>
          <div className="w-10 h-0.5 bg-sfpa-ocre mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          <div className="bg-gray-50 rounded-xl border border-gray-100 p-6 lg:p-8">
            <div className="w-11 h-11 rounded-full bg-sfpa-olive text-white flex items-center justify-center mb-4">
              <Target className="w-5 h-5" />
            </div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sfpa-olive mb-2">
              Notre mission
            </div>
            <h3 className="text-lg font-bold text-sfpa-anthracite mb-3 leading-snug">
              Former, soigner, protéger
            </h3>
            <p className="text-[14px] text-gray-600 leading-relaxed">
              Former les jeunes d'Afrique aux métiers techniques et professionnels,
              soigner les populations vulnérables, tout en protégeant l'environnement,
              grâce à la transmission de savoir-faire par des bénévoles de Provence.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl border border-gray-100 p-6 lg:p-8">
            <div className="w-11 h-11 rounded-full bg-sfpa-olive text-white flex items-center justify-center mb-4">
              <Eye className="w-5 h-5" />
            </div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sfpa-olive mb-2">
              Notre vision
            </div>
            <h3 className="text-lg font-bold text-sfpa-anthracite mb-3 leading-snug">
              Un monde digne et durable
            </h3>
            <p className="text-[14px] text-gray-600 leading-relaxed">
              Un monde où chaque jeune peut vivre dignement de son travail, sur une
              planète respectée. Où prendre soin des Hommes et prendre soin de la Terre
              sont une seule et même mission.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}