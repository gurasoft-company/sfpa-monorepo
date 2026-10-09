import { useEffect, useState } from 'react';
import { HeartHandshake, Plus } from 'lucide-react';

import { PageHeader } from '@/components/common/PageHeader';
import { Pagination } from '@/components/common/Pagination';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { DataTable } from '@/components/data-table/DataTable';
import { FormModal } from '@/components/forms/FormModal';
import { PartnersFilters } from '@/features/partners/PartnersFilters';
import { PartnerForm } from '@/features/partners/PartnerForm';
import { buildPartnerColumns } from '@/features/partners/PartnerColumns';
import { usePartners } from '@/features/partners/usePartners';
import { usePartnerMutations } from '@/features/partners/usePartnerMutations';
import { Button } from '@/components/ui/button';

import type { Partner } from '@/services/partners.service';
import type { PartnerFormValues } from '@/schemas/partner.schema';
import { canDelete, useAuthStore } from '@/store/auth.store';

const PAGE_SIZE = 10;

export default function PartnersPage() {
  const deletable = canDelete(useAuthStore((s) => s.user?.role));
  const [page, setPage] = useState(1);
  const [type, setType] = useState('');
  const [search, setSearch] = useState('');
  const [debounced, setDebounced] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Partner | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Partner | null>(null);

  useEffect(() => {
    const t = setTimeout(() => { setDebounced(search); setPage(1); }, 300);
    return () => clearTimeout(t);
  }, [search]);

  const { data, isLoading } = usePartners({
    page, limit: PAGE_SIZE,
    type: type || undefined,
    search: debounced || undefined,
  });

  const closeForm = () => { setFormOpen(false); setEditing(null); };
  const { create, update, remove } = usePartnerMutations(closeForm);

  const openCreate = () => { setEditing(null); setFormOpen(true); };
  const openEdit = (p: Partner) => { setEditing(p); setFormOpen(true); };

  const handleSubmit = async (v: PartnerFormValues) => {
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

  const columns = buildPartnerColumns({
    onEdit: openEdit,
    onDelete: setDeleteTarget,
    canDelete: deletable,
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Partenaires"
        description="Écoles, entreprises et collectivités qui nous soutiennent"
        action={
          <Button onClick={openCreate} className="bg-sfpa-terra hover:bg-sfpa-terra/90">
            <Plus className="h-4 w-4" /> Nouveau partenaire
          </Button>
        }
      />

      <PartnersFilters
        search={search}
        type={type}
        total={data?.pagination.total}
        onSearchChange={setSearch}
        onTypeChange={(v) => { setType(v); setPage(1); }}
      />

      <DataTable
        columns={columns}
        data={data?.items ?? []}
        rowKey={(p) => p.id}
        loading={isLoading}
        onRowClick={openEdit}
        emptyState={{
          icon: HeartHandshake,
          title: search || type ? 'Aucun résultat' : 'Aucun partenaire',
          description: search || type
            ? 'Modifiez vos filtres ou votre recherche.'
            : 'Ajoutez votre premier partenaire pour le voir apparaître ici.',
          action: !search && !type ? (
            <Button onClick={openCreate} variant="outline">
              <Plus className="h-4 w-4" /> Ajouter un partenaire
            </Button>
          ) : undefined,
        }}
      />

      {data?.pagination && <Pagination pagination={data.pagination} onPageChange={setPage} />}

      <FormModal
        open={formOpen}
        onOpenChange={(o) => { setFormOpen(o); if (!o) setEditing(null); }}
        title={editing ? 'Modifier le partenaire' : 'Nouveau partenaire'}
        description={editing ? `Modification de « ${editing.name} »` : undefined}
      >
        <PartnerForm
          partner={editing}
          submitting={create.isPending || update.isPending}
          onSubmit={handleSubmit}
          onCancel={closeForm}
        />
      </FormModal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
        title="Supprimer ce partenaire ?"
        description={deleteTarget && (
          <span>
            Le partenaire <strong>{deleteTarget.name}</strong> sera définitivement supprimé.
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