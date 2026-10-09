'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Container } from '@/components/layout/Container';

const CATEGORIES = [
  { value: '', label: 'Tout' },
  { value: 'Actualité', label: 'Actualités' },
  { value: 'Événement', label: 'Événements' },
  { value: 'Formation', label: 'Formations' },
  { value: 'Santé', label: 'Santé' },
  { value: 'Témoignage', label: 'Témoignages' },
];

export function FiltersActualites({ activeCategory }: { activeCategory?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set('category', value);
    else params.delete('category');
    const query = params.toString();
    router.push(`/actualites${query ? `?${query}` : ''}`);
  };

  const current = activeCategory || '';

  return (
    <section className="relative py-5 bg-white border-y border-gray-100">
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = current === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => handleClick(cat.value)}
                className={`px-4 py-2 rounded-full text-[12px] font-semibold transition-all duration-200 border ${
                  isActive
                    ? 'bg-sfpa-olive text-white border-sfpa-olive shadow-sm'
                    : 'bg-white text-sfpa-anthracite border-gray-200 hover:border-sfpa-olive/40 hover:text-sfpa-olive'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </Container>
    </section>
  );
}