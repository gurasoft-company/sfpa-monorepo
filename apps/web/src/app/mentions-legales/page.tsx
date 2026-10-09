import { Container } from '@/components/layout/Container';

export default function MentionsLegalesPage() {
  return (
    <div className="py-16">
      <Container className="max-w-3xl prose prose-lg text-gray-700">
        <h1 className="text-4xl font-bold text-sfpa-olive mb-8">Mentions légales</h1>
        <h2 className="text-2xl font-bold mt-8 mb-4">Éditeur du site</h2>
        <p>SFPA — Solidarité Fraternelle Provence Afrique<br />
        47 rue de Lisbonne, 13300 Salon-de-Provence<br />
        Email : sofpra22@gmail.com<br />
        Téléphone : +33 7 49 91 25 43</p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Hébergement</h2>
        <p>Ce site est hébergé par Vercel Inc.<br />440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Propriété intellectuelle</h2>
        <p>L'ensemble des contenus présents sur ce site (textes, images, logos) est la propriété exclusive de SFPA, sauf mention contraire. Toute reproduction est interdite sans autorisation préalable.</p>
      </Container>
    </div>
  );
}