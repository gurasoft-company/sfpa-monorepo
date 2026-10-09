import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background text-center">
      <p className="font-heading text-7xl font-bold text-sfpa-terra">404</p>
      <h1 className="font-heading text-2xl font-semibold">Page introuvable</h1>
      <p className="text-muted-foreground">
        La page que vous cherchez n'existe pas ou a été déplacée.
      </p>
      <Button asChild className="mt-2">
        <Link to="/dashboard">Retour au tableau de bord</Link>
      </Button>
    </div>
  );
}