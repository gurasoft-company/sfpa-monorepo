import Image from 'next/image';
import Link from 'next/link';
import { ProjectListItem } from '@/lib/types';

export function ProjectCard({ project }: { project: ProjectListItem }) {
  return (
    <Link href={`/actions/${project.slug}`} className="group block bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition border border-gray-100">
      <div className="relative h-48 bg-gray-200">
        {project.coverImage ? (
          <Image src={project.coverImage.url} alt={project.coverImage.alt || project.title} fill className="object-cover group-hover:scale-105 transition duration-300" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">Pas d'image</div>
        )}
      </div>
      <div className="p-6">
        <span className="text-xs font-semibold text-sfpa-terra uppercase tracking-wider">{project.category}</span>
        <h3 className="mt-2 text-xl font-bold text-sfpa-anthracite group-hover:text-sfpa-olive transition">{project.title}</h3>
        <p className="mt-2 text-sm text-gray-600 line-clamp-3">{project.excerpt}</p>
        <div className="mt-4 flex gap-4 text-xs text-gray-500">
          <span>📍 {project.country || 'Afrique'}</span>
          <span className="capitalize">📌 {project.status.replace('_', ' ')}</span>
        </div>
      </div>
    </Link>
  );
}