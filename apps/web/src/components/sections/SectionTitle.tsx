export function SectionTitle({
  overline,
  title,
  subtitle,
  centered = true,
  light = false,
}: {
  overline?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}) {
  return (
    <div className={`${centered ? 'text-center mx-auto' : ''} max-w-3xl mb-12`}>
      {overline && (
        <div className={`text-xs font-semibold uppercase tracking-widest mb-3 ${light ? 'text-sfpa-ocre' : 'text-sfpa-terra'}`}>
          {overline}
        </div>
      )}
      <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${light ? 'text-white' : 'text-sfpa-anthracite'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg ${light ? 'text-white/80' : 'text-gray-600'}`}>{subtitle}</p>
      )}
    </div>
  );
}