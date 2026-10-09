import { Badge } from '@/components/ui/badge';

type Tone = 'default' | 'success' | 'warning' | 'destructive' | 'info' | 'secondary';

interface Props {
  label: string;
  tone?: Tone;
}

const TONE_TO_VARIANT: Record<Tone, 'default' | 'success' | 'warning' | 'destructive' | 'info' | 'secondary'> = {
  default: 'default',
  success: 'success',
  warning: 'warning',
  destructive: 'destructive',
  info: 'info',
  secondary: 'secondary',
};

export function StatusBadge({ label, tone = 'default' }: Props) {
  return <Badge variant={TONE_TO_VARIANT[tone]}>{label}</Badge>;
}

/** Helpers de mapping statut → badge (utilisés plus tard dans les CRUD) */
export const STATUS_MAP: Record<string, { label: string; tone: Tone }> = {
  // Publication
  published: { label: 'Publié', tone: 'success' },
  draft: { label: 'Brouillon', tone: 'secondary' },

  // Formulaires
  pending: { label: 'En attente', tone: 'warning' },
  approved: { label: 'Approuvé', tone: 'success' },
  rejected: { label: 'Rejeté', tone: 'destructive' },

  // Projets
  en_cours: { label: 'En cours', tone: 'info' },
  termine: { label: 'Terminé', tone: 'success' },
  a_venir: { label: 'À venir', tone: 'warning' },

  // Dons
  paid: { label: 'Payé', tone: 'success' },
  failed: { label: 'Échoué', tone: 'destructive' },
  refunded: { label: 'Remboursé', tone: 'warning' },
  cancelled: { label: 'Annulé', tone: 'secondary' },
};