import type { ReactNode } from 'react';

export function FormSection({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <section className="space-y-4">
      {title && (
        <h3 className="font-heading text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </h3>
      )}
      {children}
    </section>
  );
}