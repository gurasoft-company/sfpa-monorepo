'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Container } from '@/components/layout/Container';

interface FiltersActionsProps {
  categories?: string[];
  labels?: Record<string, string>;
  activeCategory?: string;
}

export function FiltersActions({
  categories = [],
  labels = {},
  activeCategory,
}: FiltersActionsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set('category', value);
    else params.delete('category');
    const query = params.toString();
    router.push(`/actions${query ? `?${query}` : ''}`);
  };

  const current = activeCategory || '';

  // Aucune catégorie → pas de filtres
  if (!categories || categories.length === 0) return null;

  return (
    <section className="relative py-5 bg-white border-b border-gray-100">
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => handleClick('')}
            className={`px-4 py-2 rounded-full text-[12px] font-semibold transition-all duration-200 border ${
              current === ''
                ? 'bg-sfpa-olive text-white border-sfpa-olive shadow-sm'
                : 'bg-white text-sfpa-anthracite border-gray-200 hover:border-sfpa-olive/40 hover:text-sfpa-olive'
            }`}
          >
            Tous
          </button>

          {categories.map((cat) => {
            const isActive = current === cat;
            return (
              <button
                key={cat}
                onClick={() => handleClick(cat)}
                className={`px-4 py-2 rounded-full text-[12px] font-semibold transition-all duration-200 border ${
                  isActive
                    ? 'bg-sfpa-olive text-white border-sfpa-olive shadow-sm'
                    : 'bg-white text-sfpa-anthracite border-gray-200 hover:border-sfpa-olive/40 hover:text-sfpa-olive'
                }`}
              >
                {labels?.[cat] || cat}
              </button>
            );
          })}
        </div>
      </Container>
    </section>
  );
}