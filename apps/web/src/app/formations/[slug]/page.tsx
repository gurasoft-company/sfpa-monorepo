import { api } from '@/lib/api';
import { Container } from '@/components/layout/Container';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function FormationDetailPage({ params }: { params: { slug: string } }) {
  let formation;
  try {
    const res = await api.getFormation(params.slug);
    formation = res.data.formation;
  } catch (e) {
    notFound();
  }

  return (
    <div className="py-16">
      <Container className="max-w-3xl">
        <Link href="/formations" className="text-sfpa-olive hover:underline mb-8 inline-block">&larr; Retour aux formations</Link>
        {formation.coverImage && (
          <div className="relative h-96 w-full rounded-lg overflow-hidden mb-8">
            <Image src={formation.coverImage.url} alt={formation.coverImage.alt || formation.title} fill className="object-cover" />
          </div>
        )}
        <span className="text-sm font-semibold text-sfpa-ocre uppercase">{formation.category}</span>
        <h1 className="text-4xl font-bold text-sfpa-anthracite mt-2 mb-6">{formation.title}</h1>
        <div className="bg-sfpa-sable p-6 rounded-lg mb-8 grid grid-cols-2 gap-4 text-sm">
          <div><span className="font-semibold">Durée :</span> {formation.duration || 'N/A'}</div>
          <div><span className="font-semibold">Niveau :</span> {formation.level || 'N/A'}</div>
          <div><span className="font-semibold">Public :</span> {formation.audience || 'N/A'}</div>
        </div>
        <div className="prose prose-lg max-w-none text-gray-700 mb-8">
          {formation.description}
        </div>
        {formation.objectives && formation.objectives.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Objectifs</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {formation.objectives.map((obj, i) => <li key={i}>{obj}</li>)}
            </ul>
          </div>
        )}
      </Container>
    </div>
  );
}