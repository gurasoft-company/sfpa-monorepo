export function StatCard({ value, label, color = 'terra' }: { value: string; label: string; color?: 'terra' | 'olive' | 'ocre' | 'bleu' }) {
  const colorClass = {
    terra: 'text-sfpa-terra',
    olive: 'text-sfpa-olive',
    ocre: 'text-sfpa-ocre',
    bleu: 'text-sfpa-bleu',
  }[color];
  return (
    <div className="text-center">
      <div className={`text-5xl md:text-6xl font-bold mb-2 ${colorClass}`}>{value}</div>
      <div className="text-sm font-medium text-sfpa-anthracite uppercase tracking-wider">{label}</div>
    </div>
  );
}