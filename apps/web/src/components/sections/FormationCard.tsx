import Image from 'next/image';
import Link from 'next/link';
import { FormationListItem } from '@/lib/types';

export function FormationCard({ formation }: { formation: FormationListItem }) {
  return (
    <Link href={`/formations/${formation.slug}`} className="group block bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition border border-gray-100">
      <div className="relative h-48 bg-gray-200">
        {formation.coverImage ? (
          <Image src={formation.coverImage.url} alt={formation.coverImage.alt || formation.title} fill className="object-cover group-hover:scale-105 transition duration-300" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">Pas d'image</div>
        )}
      </div>
      <div className="p-6">
        <span className="text-xs font-semibold text-sfpa-ocre uppercase tracking-wider">{formation.category}</span>
        <h3 className="mt-2 text-xl font-bold text-sfpa-anthracite group-hover:text-sfpa-olive transition">{formation.title}</h3>
        <p className="mt-2 text-sm text-gray-600 line-clamp-3">{formation.excerpt}</p>
        <div className="mt-4 flex gap-4 text-xs text-gray-500">
          <span>⏱ {formation.duration || 'N/A'}</span>
          <span>🎓 {formation.level || 'N/A'}</span>
        </div>
      </div>
    </Link>
  );
}