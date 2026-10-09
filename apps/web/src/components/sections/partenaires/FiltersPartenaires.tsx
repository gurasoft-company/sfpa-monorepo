'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Container } from '@/components/layout/Container';

const TYPES = [
  { value: '', label: 'Tous' },
  { value: 'ecole', label: 'Écoles' },
  { value: 'entreprise', label: 'Entreprises' },
  { value: 'collectivite', label: 'Collectivités' },
  { value: 'association', label: 'Associations' },
  { value: 'autre', label: 'Autres' },
];

export function FiltersPartenaires({ activeType }: { activeType?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set('type', value);
    else params.delete('type');
    const query = params.toString();
    router.push(`/partenaires${query ? `?${query}` : ''}`);
  };

  const current = activeType || '';

  return (
    <section className="relative py-5 bg-white border-b border-gray-100">
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {TYPES.map((type) => {
            const isActive = current === type.value;
            return (
              <button
                key={type.value}
                onClick={() => handleClick(type.value)}
                className={`px-4 py-2 rounded-full text-[12px] font-semibold transition-all duration-200 border ${
                  isActive
                    ? 'bg-sfpa-olive text-white border-sfpa-olive shadow-sm'
                    : 'bg-white text-sfpa-anthracite border-gray-200 hover:border-sfpa-olive/40 hover:text-sfpa-olive'
                }`}
              >
                {type.label}
              </button>
            );
          })}
        </div>
      </Container>
    </section>
  );
}