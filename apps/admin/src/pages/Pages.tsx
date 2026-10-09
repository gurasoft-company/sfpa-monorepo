import { useEffect, useState } from 'react';
import { FileText, Plus } from 'lucide-react';

import { PageHeader } from '@/components/common/PageHeader';
import { Pagination } from '@/components/common/Pagination';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { DataTable } from '@/components/data-table/DataTable';
import { FormModal } from '@/components/forms/FormModal';
import { PagesFilters } from '@/features/pages/PagesFilters';
import { PageForm } from '@/features/pages/PageForm';
import { buildPageColumns } from '@/features/pages/PageColumns';
import { usePages } from '@/features/pages/usePages';
import { usePageMutations } from '@/features/pages/usePageMutations';
import { Button } from '@/components/ui/button';

import type { Page } from '@/services/pages.service';
import type { PageFormValues } from '@/schemas/page.schema';
import { canDelete, useAuthStore } from '@/store/auth.store';

const PAGE_SIZE = 10;

export default function PagesPage() {
  const deletable = canDelete(useAuthStore((s) => s.user?.role));
  const [page, setPage] = useState(1);
  const [isPublished, setIsPublished] = useState('');
  const [search, setSearch] = useState('');
  const [debounced, setDebounced] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Page | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Page | null>(null);

  useEffect(() => {
    const t = setTimeout(() => { setDebounced(search); setPage(1); }, 300);
    return () => clearTimeout(t);
  }, [search]);

  const { data, isLoading } = usePages({
    page, limit: PAGE_SIZE,
    isPublished: isPublished === '' ? undefined : isPublished === 'true',
    search: debounced || undefined,
  });

  const closeForm = () => { setFormOpen(false); setEditing(null); };
  const { create, update, remove } = usePageMutations(closeForm);

  const openCreate = () => { setEditing(null); setFormOpen(true); };
  const openEdit = (p: Page) => { setEditing(p); setFormOpen(true); };

  const handleSubmit = async (v: PageFormValues) => {
    const payload = {
      slug: v.slug,
      title: v.title,
      content: v.content.trim() ? JSON.parse(v.content) : null,
      metaTitle: v.metaTitle || null,
      metaDescription: v.metaDescription || null,
      isPublished: v.isPublished,
    };
    if (editing) await update.mutateAsync({ id: editing.id, values: payload });
    else await create.mutateAsync(payload);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await remove.mutateAsync(deleteTarget.id);
      setDeleteTarget(null);
    } catch { /* toast géré */ }
  };

  const columns = buildPageColumns({
    onEdit: openEdit,
    onDelete: setDeleteTarget,
    canDelete: deletable,
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Pages"
        description="Pages éditables du site public (contenu JSON)"
        action={
          <Button onClick={openCreate} className="bg-sfpa-terra hover:bg-sfpa-terra/90">
            <Plus className="h-4 w-4" /> Nouvelle page
          </Button>
        }
      />

      <PagesFilters
        search={search}
        isPublished={isPublished}
        total={data?.pagination.total}
        onSearchChange={setSearch}
        onPublishedChange={(v) => { setIsPublished(v); setPage(1); }}
      />

      <DataTable
        columns={columns}
        data={data?.items ?? []}
        rowKey={(p) => p.id}
        loading={isLoading}
        onRowClick={openEdit}
        emptyState={{
          icon: FileText,
          title: search || isPublished ? 'Aucun résultat' : 'Aucune page',
          description: search || isPublished
            ? 'Modifiez vos filtres ou votre recherche.'
            : 'Créez une page pour la rendre éditable.',
          action: !search && !isPublished ? (
            <Button onClick={openCreate} variant="outline">
              <Plus className="h-4 w-4" /> Créer une page
            </Button>
          ) : undefined,
        }}
      />

      {data?.pagination && <Pagination pagination={data.pagination} onPageChange={setPage} />}

      <FormModal
        open={formOpen}
        onOpenChange={(o) => { setFormOpen(o); if (!o) setEditing(null); }}
        title={editing ? 'Modifier la page' : 'Nouvelle page'}
        description={editing ? `Page /${editing.slug}` : undefined}
        className="max-w-3xl"
      >
        <PageForm
          page={editing}
          submitting={create.isPending || update.isPending}
          onSubmit={handleSubmit}
          onCancel={closeForm}
        />
      </FormModal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
        title="Supprimer cette page ?"
        description={deleteTarget && (
          <span>
            La page <strong>/{deleteTarget.slug}</strong> sera définitivement supprimée.
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