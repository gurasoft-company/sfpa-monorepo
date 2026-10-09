import Image from 'next/image';
import Link from 'next/link';
import { PostListItem } from '@/lib/types';

export function PostCard({ post }: { post: PostListItem }) {
  return (
    <Link href={`/actualites/${post.slug}`} className="group block bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition border border-gray-100">
      <div className="relative h-48 bg-gray-200">
        {post.coverImage ? (
          <Image src={post.coverImage.url} alt={post.coverImage.alt || post.title} fill className="object-cover group-hover:scale-105 transition duration-300" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">Pas d'image</div>
        )}
      </div>
      <div className="p-6">
        <span className="text-xs font-semibold text-sfpa-bleu uppercase tracking-wider">{post.category || 'Actualité'}</span>
        <h3 className="mt-2 text-xl font-bold text-sfpa-anthracite group-hover:text-sfpa-olive transition">{post.title}</h3>
        <p className="mt-2 text-sm text-gray-600 line-clamp-3">{post.excerpt}</p>
        <div className="mt-4 flex justify-between items-center text-xs text-gray-400">
          <span>{new Date(post.publishedAt).toLocaleDateString('fr-FR')}</span>
          {post.author && <span>{post.author.firstName} {post.author.lastName}</span>}
        </div>
      </div>
    </Link>
  );
}