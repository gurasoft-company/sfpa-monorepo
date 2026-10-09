import { LucideIcon } from 'lucide-react';

export function PillarCard({
  icon: Icon,
  title,
  description,
  color = 'olive',
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  color?: 'olive' | 'terra' | 'ocre' | 'bleu';
}) {
  const bg = { olive: 'bg-sfpa-olive/10 text-sfpa-olive', terra: 'bg-sfpa-terra/10 text-sfpa-terra', ocre: 'bg-sfpa-ocre/10 text-sfpa-ocre', bleu: 'bg-sfpa-bleu/10 text-sfpa-bleu' }[color];
  return (
    <div className="text-center p-8 rounded-2xl bg-white border border-gray-100 hover:shadow-lg transition duration-300">
      <div className={`w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center ${bg}`}>
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold mb-3 text-sfpa-anthracite">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}