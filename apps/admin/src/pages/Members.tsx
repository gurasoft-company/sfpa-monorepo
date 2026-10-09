import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Users } from 'lucide-react';

import { PageHeader } from '@/components/common/PageHeader';
import { Pagination } from '@/components/common/Pagination';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { DataTable } from '@/components/data-table/DataTable';
import { FormModal } from '@/components/forms/FormModal';
import { MembersFilters } from '@/features/members/MembersFilters';
import { MemberDetail } from '@/features/members/MemberDetail';
import { buildMemberColumns } from '@/features/members/MemberColumns';
import { useMembers } from '@/features/members/useMembers';
import { useMemberMutations } from '@/features/members/useMemberMutations';

import type { Member } from '@/services/members.service';
import type { MemberFormValues } from '@/schemas/member.schema';
import { canDelete, useAuthStore } from '@/store/auth.store';

const PAGE_SIZE = 10;

export default function MembersPage() {
  const deletable = canDelete(useAuthStore((s) => s.user?.role));
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const [debounced, setDebounced] = useState('');
  const [opened, setOpened] = useState<Member | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Member | null>(null);

  useEffect(() => {
    const t = setTimeout(() => { setDebounced(search); setPage(1); }, 300);
    return () => clearTimeout(t);
  }, [search]);

  const { data, isLoading } = useMembers({
    page, limit: PAGE_SIZE,
    status: status || undefined,
    search: debounced || undefined,
  });

  const { update, remove } = useMemberMutations(() => setOpened(null));

  const handleSave = async (v: MemberFormValues) => {
    if (!opened) return;
    await update.mutateAsync({ id: opened.id, values: v });
  };

  const handleQuickStatus = async (next: 'approved' | 'rejected') => {
    if (!opened) return;
    await update.mutateAsync({ id: opened.id, values: { status: next } });
    toast.success(next === 'approved' ? 'Adhérent approuvé' : 'Adhérent rejeté');
    setOpened({ ...opened, status: next });
  };

  const handleRowQuickStatus = async (m: Member, next: 'approved' | 'rejected') => {
    await update.mutateAsync({ id: m.id, values: { status: next } });
    toast.success(next === 'approved' ? 'Adhérent approuvé' : 'Adhérent rejeté');
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await remove.mutateAsync(deleteTarget.id);
      setDeleteTarget(null);
      if (opened?.id === deleteTarget.id) setOpened(null);
    } catch { /* toast géré */ }
  };

  const columns = buildMemberColumns({
    onOpen: setOpened,
    onDelete: setDeleteTarget,
    onApprove: (m) => handleRowQuickStatus(m, 'approved'),
    onReject: (m) => handleRowQuickStatus(m, 'rejected'),
    canDelete: deletable,
    loading: update.isPending,
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Adhérents"
        description="Validez les demandes d'adhésion reçues"
      />

      <MembersFilters
        search={search}
        status={status}
        total={data?.pagination.total}
        onSearchChange={setSearch}
        onStatusChange={(v) => { setStatus(v); setPage(1); }}
      />

      <DataTable
        columns={columns}
        data={data?.items ?? []}
        rowKey={(m) => m.id}
        loading={isLoading}
        onRowClick={setOpened}
        rowClassName={(m) => (m.status === 'pending' ? 'bg-sfpa-ocre/5' : undefined)}
        emptyState={{
          icon: Users,
          title: search || status ? 'Aucun résultat' : 'Aucun adhérent',
          description: search || status
            ? 'Modifiez vos filtres ou votre recherche.'
            : 'Les demandes d\'adhésion apparaîtront ici.',
        }}
      />

      {data?.pagination && <Pagination pagination={data.pagination} onPageChange={setPage} />}

      <FormModal
        open={Boolean(opened)}
        onOpenChange={(o) => !o && setOpened(null)}
        title="Fiche adhérent"
        description={opened ? `${opened.firstName} ${opened.lastName}` : undefined}
        className="max-w-3xl"
      >
        {opened && (
          <MemberDetail
            member={opened}
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
        title="Supprimer cet adhérent ?"
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