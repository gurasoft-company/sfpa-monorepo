import { useEffect, useState } from 'react';
import { GraduationCap, Plus } from 'lucide-react';

import { PageHeader } from '@/components/common/PageHeader';
import { Pagination } from '@/components/common/Pagination';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { DataTable } from '@/components/data-table/DataTable';
import { FormModal } from '@/components/forms/FormModal';
import { FormationsFilters } from '@/features/formations/FormationsFilters';
import { FormationForm } from '@/features/formations/FormationForm';
import { buildFormationColumns } from '@/features/formations/FormationColumns';
import { useFormations } from '@/features/formations/useFormations';
import { useFormationMutations } from '@/features/formations/useFormationMutations';
import { Button } from '@/components/ui/button';

import type { Formation } from '@/services/formations.service';
import type { FormationFormValues } from '@/schemas/formation.schema';
import { canDelete, useAuthStore } from '@/store/auth.store';

const PAGE_SIZE = 10;

export default function FormationsPage() {
  const deletable = canDelete(useAuthStore((s) => s.user?.role));
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [debounced, setDebounced] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Formation | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Formation | null>(null);

  useEffect(() => {
    const t = setTimeout(() => { setDebounced(search); setPage(1); }, 300);
    return () => clearTimeout(t);
  }, [search]);

  const { data, isLoading } = useFormations({
    page, limit: PAGE_SIZE,
    category: category || undefined,
    search: debounced || undefined,
  });

  const closeForm = () => { setFormOpen(false); setEditing(null); };
  const { create, update, remove } = useFormationMutations(closeForm);

  const openCreate = () => { setEditing(null); setFormOpen(true); };
  const openEdit = (f: Formation) => { setEditing(f); setFormOpen(true); };

  const handleSubmit = async (v: FormationFormValues) => {
    if (editing) await update.mutateAsync({ id: editing.id, values: v });
    else await create.mutateAsync(v);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await remove.mutateAsync(deleteTarget.id);
      setDeleteTarget(null);
    } catch { /* toast géré */ }
  };

  const columns = buildFormationColumns({
    onEdit: openEdit,
    onDelete: setDeleteTarget,
    canDelete: deletable,
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Formations"
        description="Programmes de formation professionnelle"
        action={
          <Button onClick={openCreate} className="bg-sfpa-terra hover:bg-sfpa-terra/90">
            <Plus className="h-4 w-4" /> Nouvelle formation
          </Button>
        }
      />

      <FormationsFilters
        search={search}
        category={category}
        total={data?.pagination.total}
        onSearchChange={setSearch}
        onCategoryChange={(v) => { setCategory(v); setPage(1); }}
      />

      <DataTable
        columns={columns}
        data={data?.items ?? []}
        rowKey={(f) => f.id}
        loading={isLoading}
        onRowClick={openEdit}
        emptyState={{
          icon: GraduationCap,
          title: search || category ? 'Aucun résultat' : 'Aucune formation',
          description: search || category
            ? 'Modifiez vos filtres ou votre recherche.'
            : 'Créez votre première formation pour la voir apparaître ici.',
          action: !search && !category ? (
            <Button onClick={openCreate} variant="outline">
              <Plus className="h-4 w-4" /> Créer une formation
            </Button>
          ) : undefined,
        }}
      />

      {data?.pagination && <Pagination pagination={data.pagination} onPageChange={setPage} />}

      <FormModal
        open={formOpen}
        onOpenChange={(o) => { setFormOpen(o); if (!o) setEditing(null); }}
        title={editing ? 'Modifier la formation' : 'Nouvelle formation'}
        description={editing ? `Modification de « ${editing.title} »` : undefined}
      >
        <FormationForm
          formation={editing}
          submitting={create.isPending || update.isPending}
          onSubmit={handleSubmit}
          onCancel={closeForm}
        />
      </FormModal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
        title="Supprimer cette formation ?"
        description={deleteTarget && (
          <span>
            La formation <strong>{deleteTarget.title}</strong> sera définitivement supprimée.
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