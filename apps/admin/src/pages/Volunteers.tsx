import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { HeartHandshake } from 'lucide-react';

import { PageHeader } from '@/components/common/PageHeader';
import { Pagination } from '@/components/common/Pagination';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { DataTable } from '@/components/data-table/DataTable';
import { FormModal } from '@/components/forms/FormModal';
import { VolunteersFilters } from '@/features/volunteers/VolunteersFilters';
import { VolunteerDetail } from '@/features/volunteers/VolunteerDetail';
import { buildVolunteerColumns } from '@/features/volunteers/VolunteerColumns';
import { useVolunteers } from '@/features/volunteers/useVolunteers';
import { useVolunteerMutations } from '@/features/volunteers/useVolunteerMutations';

import type { Volunteer } from '@/services/volunteers.service';
import type { VolunteerFormValues } from '@/schemas/volunteer.schema';
import { canDelete, useAuthStore } from '@/store/auth.store';

const PAGE_SIZE = 10;

export default function VolunteersPage() {
  const deletable = canDelete(useAuthStore((s) => s.user?.role));
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const [debounced, setDebounced] = useState('');
  const [opened, setOpened] = useState<Volunteer | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Volunteer | null>(null);

  useEffect(() => {
    const t = setTimeout(() => { setDebounced(search); setPage(1); }, 300);
    return () => clearTimeout(t);
  }, [search]);

  const { data, isLoading } = useVolunteers({
    page, limit: PAGE_SIZE,
    status: status || undefined,
    search: debounced || undefined,
  });

  const { update, remove } = useVolunteerMutations(() => setOpened(null));

  const handleSave = async (v: VolunteerFormValues) => {
    if (!opened) return;
    await update.mutateAsync({ id: opened.id, values: v });
  };

  const handleQuickStatus = async (next: 'approved' | 'rejected') => {
    if (!opened) return;
    await update.mutateAsync({ id: opened.id, values: { status: next } });
    toast.success(next === 'approved' ? 'Bénévole approuvé' : 'Bénévole rejeté');
    setOpened({ ...opened, status: next });
  };

  const handleRowStatus = async (v: Volunteer, next: 'approved' | 'rejected') => {
    await update.mutateAsync({ id: v.id, values: { status: next } });
    toast.success(next === 'approved' ? 'Bénévole approuvé' : 'Bénévole rejeté');
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await remove.mutateAsync(deleteTarget.id);
      setDeleteTarget(null);
      if (opened?.id === deleteTarget.id) setOpened(null);
    } catch { /* toast géré */ }
  };

  const columns = buildVolunteerColumns({
    onOpen: setOpened,
    onDelete: setDeleteTarget,
    onApprove: (v) => handleRowStatus(v, 'approved'),
    onReject: (v) => handleRowStatus(v, 'rejected'),
    canDelete: deletable,
    loading: update.isPending,
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Bénévoles"
        description="Validez les candidatures de bénévolat"
      />

      <VolunteersFilters
        search={search}
        status={status}
        total={data?.pagination.total}
        onSearchChange={setSearch}
        onStatusChange={(v) => { setStatus(v); setPage(1); }}
      />

      <DataTable
        columns={columns}
        data={data?.items ?? []}
        rowKey={(v) => v.id}
        loading={isLoading}
        onRowClick={setOpened}
        rowClassName={(v) => (v.status === 'pending' ? 'bg-sfpa-ocre/5' : undefined)}
        emptyState={{
          icon: HeartHandshake,
          title: search || status ? 'Aucun résultat' : 'Aucun bénévole',
          description: search || status
            ? 'Modifiez vos filtres ou votre recherche.'
            : 'Les candidatures de bénévolat apparaîtront ici.',
        }}
      />

      {data?.pagination && <Pagination pagination={data.pagination} onPageChange={setPage} />}

      <FormModal
        open={Boolean(opened)}
        onOpenChange={(o) => !o && setOpened(null)}
        title="Fiche bénévole"
        description={opened ? `${opened.firstName} ${opened.lastName}` : undefined}
        className="max-w-3xl"
      >
        {opened && (
          <VolunteerDetail
            volunteer={opened}
            submitting={update.isPending}
            onSave={handleSave}
            onQuickStatus={handleQuickStatus}
            onCancel={() => setOpened(null)}
          />
        )}
      </FormModal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
        title="Supprimer ce bénévole ?"
        description={deleteTarget && (
          <span>
            <strong>{deleteTarget.firstName} {deleteTarget.lastName}</strong> sera définitivement supprimé.
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