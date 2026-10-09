import type { ReactNode } from 'react';

interface Props {
  title: string;
  children: ReactNode;
}

export function StatSection({ title, children }: Props) {
  return (
    <section>
      <h2 className="mb-3 font-heading text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{children}</div>
    </section>
  );
}