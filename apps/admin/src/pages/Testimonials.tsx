import { useEffect, useState } from 'react';
import { Plus, Quote } from 'lucide-react';
import { toast } from 'sonner';

import { PageHeader } from '@/components/common/PageHeader';
import { Pagination } from '@/components/common/Pagination';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { DataTable } from '@/components/data-table/DataTable';
import { FormModal } from '@/components/forms/FormModal';
import { TestimonialsFilters } from '@/features/testimonials/TestimonialsFilters';
import { TestimonialForm } from '@/features/testimonials/TestimonialForm';
import { buildTestimonialColumns } from '@/features/testimonials/TestimonialColumns';
import { useTestimonials } from '@/features/testimonials/useTestimonials';
import { useTestimonialMutations } from '@/features/testimonials/useTestimonialMutations';
import { Button } from '@/components/ui/button';

import type { Testimonial } from '@/services/testimonials.service';
import type { TestimonialFormValues } from '@/schemas/testimonial.schema';
import { canDelete, useAuthStore } from '@/store/auth.store';

const PAGE_SIZE = 10;

export default function TestimonialsPage() {
  const deletable = canDelete(useAuthStore((s) => s.user?.role));
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const [debounced, setDebounced] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Testimonial | null>(null);

  useEffect(() => {
    const t = setTimeout(() => { setDebounced(search); setPage(1); }, 300);
    return () => clearTimeout(t);
  }, [search]);

  const { data, isLoading } = useTestimonials({
    page, limit: PAGE_SIZE,
    status: status || undefined,
    search: debounced || undefined,
  });

  const closeForm = () => { setFormOpen(false); setEditing(null); };
  const { create, update, remove, approve, reject } = useTestimonialMutations(closeForm);

  const openCreate = () => { setEditing(null); setFormOpen(true); };
  const openEdit = (t: Testimonial) => { setEditing(t); setFormOpen(true); };

  const handleSubmit = async (v: TestimonialFormValues) => {
    if (editing) await update.mutateAsync({ id: editing.id, values: v });
    else await create.mutateAsync(v);
  };

  // 1-clic approve / reject
  const handleApprove = async (t: Testimonial) => {
    await approve.mutateAsync(t.id, { status: 'approved' } as never);
    toast.success(`« ${t.authorName} » approuvé`);
  };
  const handleReject = async (t: Testimonial) => {
    await reject.mutateAsync(t.id, { status: 'rejected' } as never);
    toast.success(`« ${t.authorName} » rejeté`);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await remove.mutateAsync(deleteTarget.id);
      setDeleteTarget(null);
    } catch { /* toast géré */ }
  };

  const columns = buildTestimonialColumns({
    onEdit: openEdit,
    onDelete: setDeleteTarget,
    onApprove: handleApprove,
    onReject: handleReject,
    canDelete: deletable,
    loading: approve.isPending || reject.isPending,
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Témoignages"
        description="Approuvez, modifiez ou mettez en avant les retours reçus"
        action={
          <Button onClick={openCreate} className="bg-sfpa-terra hover:bg-sfpa-terra/90">
            <Plus className="h-4 w-4" /> Nouveau témoignage
          </Button>
        }
      />

      <TestimonialsFilters
        search={search}
        status={status}
        total={data?.pagination.total}
        onSearchChange={setSearch}
        onStatusChange={(v) => { setStatus(v); setPage(1); }}
      />

      <DataTable
        columns={columns}
        data={data?.items ?? []}
        rowKey={(t) => t.id}
        loading={isLoading}
        onRowClick={openEdit}
        emptyState={{
          icon: Quote,
          title: search || status ? 'Aucun résultat' : 'Aucun témoignage',
          description: search || status
            ? 'Modifiez vos filtres ou votre recherche.'
            : 'Les témoignages soumis par le public apparaîtront ici.',
        }}
      />

      {data?.pagination && <Pagination pagination={data.pagination} onPageChange={setPage} />}

      <FormModal
        open={formOpen}
        onOpenChange={(o) => { setFormOpen(o); if (!o) setEditing(null); }}
        title={editing ? 'Modifier le témoignage' : 'Nouveau témoignage'}
        description={editing ? `Modification de « ${editing.authorName} »` : undefined}
      >
        <TestimonialForm
          testimonial={editing}
          submitting={create.isPending || update.isPending}
          onSubmit={handleSubmit}
          onCancel={closeForm}
        />
      </FormModal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
        title="Supprimer ce témoignage ?"
        description={deleteTarget && (
          <span>
            Le témoignage de <strong>{deleteTarget.authorName}</strong> sera définitivement supprimé.
          </span>
        )}
        confirmLabel="Supprimer"
        destructive
        loading={remove.isPending}
        onConfirm={handleDelete}
      />
    </div>
  );
}