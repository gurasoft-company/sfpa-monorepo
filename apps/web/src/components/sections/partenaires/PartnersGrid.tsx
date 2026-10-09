import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, MapPin, BadgeCheck } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import type { Partner } from '@/lib/types';

const TYPE_LABELS: Record<string, string> = {
  ecole: 'École partenaire',
  entreprise: 'Entreprise partenaire',
  collectivite: 'Collectivité partenaire',
  association: 'Association partenaire',
  autre: 'Partenaire officiel',
};

export function PartnersGrid({ partners }: { partners: Partner[] }) {
  return (
    <section className="relative py-16 lg:py-20 bg-gray-50">
      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Label */}
          <div className="flex items-center gap-3 mb-10">
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sfpa-olive">
              Nos partenaires actuels
            </span>
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-[11px] text-gray-400">
              {partners.length} partenaire{partners.length > 1 ? 's' : ''}
            </span>
          </div>

          {partners.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
              <p className="text-gray-500 text-sm">
                Aucun partenaire dans cette catégorie pour le moment.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {partners.map((partner) => {
                const card = (
                  <div className="group relative h-full bg-sfpa-olive rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                    {/* Halo décoratif interne */}
                    <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-sfpa-ocre/10 rounded-full blur-3xl pointer-events-none" />

                    {/* Zone logo — fond blanc */}
                    <div className="relative bg-white rounded-2xl mx-4 mt-4 px-6 py-7 flex items-center justify-center">
                      {/* Sceau "Partenaire" */}
                      <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-sfpa-olive/10 border border-sfpa-olive/20">
                        <BadgeCheck className="w-3 h-3 text-sfpa-olive" />
                        <span className="text-[9px] font-bold uppercase tracking-wider text-sfpa-olive">
                          Partenaire
                        </span>
                      </div>

                      {/* Logo */}
                      <div className="relative w-full h-24 flex items-center justify-center">
                        {partner.logo ? (
                          <Image
                            src={partner.logo.url}
                            alt={partner.logo.alt || partner.name}
                            width={200}
                            height={96}
                            className="max-h-24 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-sfpa-olive to-sfpa-olive/70 flex items-center justify-center text-white font-serif font-bold text-3xl shadow-lg group-hover:scale-110 transition-transform duration-500">
                            {partner.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Zone texte sur fond vert */}
                    <div className="relative p-6 flex flex-col items-center text-center">
                      {/* Nom */}
                      <h3 className="text-[16px] font-bold text-white leading-snug mb-3 group-hover:text-sfpa-ocre transition-colors line-clamp-2 min-h-[2.5rem]">
                        {partner.name}
                      </h3>

                      {/* Type */}
                      <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/75 mb-3">
                        {TYPE_LABELS[partner.type] || partner.type}
                      </div>

                      {/* Pays */}
                      {partner.country && (
                        <div className="inline-flex items-center gap-1.5 text-[11px] text-white/80">
                          <MapPin className="w-3 h-3 text-sfpa-ocre" />
                          {partner.country}
                        </div>
                      )}

                      {/* CTA au survol */}
                      {partner.website && (
                        <div className="mt-5 pt-4 border-t border-white/15 w-full opacity-80 group-hover:opacity-100 transition-opacity">
                          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-sfpa-ocre group-hover:gap-2.5 transition-all">
                            Découvrir
                            <ExternalLink className="w-3 h-3" />
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );

                return partner.website ? (
                  <a
                    key={partner.id}
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full"
                  >
                    {card}
                  </a>
                ) : (
                  <div key={partner.id} className="h-full">
                    {card}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}