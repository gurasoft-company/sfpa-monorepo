import Link from 'next/link';
import { Calendar, MapPin, Tag, ArrowRight, Heart } from 'lucide-react';
import type { Project } from '@/lib/types';

const STATUS_LABELS: Record<string, string> = {
  en_cours: 'En cours',
  termine: 'Terminé',
  a_venir: 'À venir',
};

function formatDate(date: string | null) {
  if (!date) return null;
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function ProjectSidebar({ project }: { project: Project }) {
  const startDate = formatDate(project.startDate);
  const endDate = formatDate(project.endDate);

  return (
    <aside className="lg:sticky lg:top-24 h-fit">
      {/* Carte détails */}
      <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 mb-5">
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sfpa-olive mb-4">
          Détails du projet
        </h3>

        <ul className="space-y-4 text-[13.5px]">
          {project.category && (
            <li className="flex items-start gap-3">
              <Tag className="w-4 h-4 text-sfpa-olive mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
                  Catégorie
                </div>
                <div className="text-sfpa-anthracite font-medium capitalize">
                  {project.category}
                </div>
              </div>
            </li>
          )}

          {project.country && (
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-sfpa-olive mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
                  Pays
                </div>
                <div className="text-sfpa-anthracite font-medium">
                  {project.country}
                </div>
              </div>
            </li>
          )}

          <li className="flex items-start gap-3">
            <Calendar className="w-4 h-4 text-sfpa-olive mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
                Statut
              </div>
              <div className="text-sfpa-anthracite font-medium">
                {STATUS_LABELS[project.status] || project.status}
              </div>
            </div>
          </li>

          {(startDate || endDate) && (
            <li className="flex items-start gap-3">
              <Calendar className="w-4 h-4 text-sfpa-olive mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
                  Période
                </div>
                <div className="text-sfpa-anthracite font-medium">
                  {startDate && <div>Depuis : {startDate}</div>}
                  {endDate && <div>Jusqu&apos;à : {endDate}</div>}
                  {!startDate && !endDate && 'En cours'}
                </div>
              </div>
            </li>
          )}
        </ul>
      </div>

      {/* Carte don */}
      <div className="bg-sfpa-olive rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative">
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sfpa-ocre mb-3">
            Soutenez ce projet
          </div>
          <h3 className="text-base font-bold mb-3 leading-snug">
            Votre don finance concrètement cette action
          </h3>
          <p className="text-[13px] text-white/85 leading-relaxed mb-5">
            Chaque contribution permet d&apos;avancer, d&apos;équiper, de former,
            de soigner.
          </p>
          <Link
            href="/faire-un-don"
            className="inline-flex items-center justify-center gap-2 w-full bg-white text-sfpa-olive font-semibold px-5 py-3 rounded-full hover:bg-sfpa-sable transition shadow-sm text-[13px]"
          >
            <Heart className="w-4 h-4" /> Faire un don
          </Link>
        </div>
      </div>

      {/* Carte contact */}
      <div className="mt-5 p-5 rounded-2xl border border-gray-100 bg-white text-center">
        <p className="text-[12px] text-gray-500 leading-relaxed mb-3">
          Une question sur ce projet ?
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 text-sfpa-olive text-[11px] font-semibold uppercase tracking-wider hover:gap-2.5 transition-all"
        >
          Nous contacter
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </aside>
  );
}