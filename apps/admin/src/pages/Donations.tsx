import { useEffect, useState } from 'react';
import { DollarSign } from 'lucide-react';

import { PageHeader } from '@/components/common/PageHeader';
import { Pagination } from '@/components/common/Pagination';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { DataTable } from '@/components/data-table/DataTable';
import { FormModal } from '@/components/forms/FormModal';
import { DonationStatsCards } from '@/features/donations/DonationStatsCards';
import { DonationFilters } from '@/features/donations/DonationFilters';
import { DonationDetail } from '@/features/donations/DonationDetail';
import { buildDonationColumns } from '@/features/donations/DonationColumns';
import { useDonations } from '@/features/donations/useDonations';
import { useDonationMutations } from '@/features/donations/useDonationMutations';

import type { Donation } from '@/services/donations.service';
import type { DonationFormValues } from '@/schemas/donation.schema';
import { canDelete, useAuthStore } from '@/store/auth.store';

const PAGE_SIZE = 10;

export default function DonationsPage() {
  const deletable = canDelete(useAuthStore((s) => s.user?.role));
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('');
  const [frequency, setFrequency] = useState('');
  const [search, setSearch] = useState('');
  const [debounced, setDebounced] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [opened, setOpened] = useState<Donation | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Donation | null>(null);

  useEffect(() => {
    const t = setTimeout(() => { setDebounced(search); setPage(1); }, 300);
    return () => clearTimeout(t);
  }, [search]);

  const { data, isLoading } = useDonations({
    page, limit: PAGE_SIZE,
    status: status || undefined,
    frequency: frequency || undefined,
    search: debounced || undefined,
    from: from || undefined,
    to: to || undefined,
  });

  const { update, remove } = useDonationMutations(() => setOpened(null));

  const handleSave = async (v: DonationFormValues) => {
    if (!opened) return;
    await update.mutateAsync({ id: opened.id, values: v });
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await remove.mutateAsync(deleteTarget.id);
      setDeleteTarget(null);
      if (opened?.id === deleteTarget.id) setOpened(null);
    } catch { /* toast géré */ }
  };

  const columns = buildDonationColumns({
    onEdit: setOpened,
    onDelete: setDeleteTarget,
    canDelete: deletable,
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dons"
        description="Suivi des dons Stripe et gestion des reçus fiscaux"
      />

      <DonationStatsCards />

      <DonationFilters
        search={search}
        status={status}
        frequency={frequency}
        from={from}
        to={to}
        total={data?.pagination.total}
        onSearchChange={setSearch}
        onStatusChange={(v) => { setStatus(v); setPage(1); }}
        onFrequencyChange={(v) => { setFrequency(v); setPage(1); }}
        onFromChange={(v) => { setFrom(v); setPage(1); }}
        onToChange={(v) => { setTo(v); setPage(1); }}
      />

      <DataTable
        columns={columns}
        data={data?.items ?? []}
        rowKey={(d) => d.id}
        loading={isLoading}
        onRowClick={setOpened}
        rowClassName={(d) => (d.status === 'paid' ? undefined : 'opacity-75')}
        emptyState={{
          icon: DollarSign,
          title: search || status || frequency || from || to ? 'Aucun résultat' : 'Aucun don',
          description: search || status || frequency || from || to
            ? 'Modifiez vos filtres ou votre recherche.'
            : 'Les dons arriveront automatiquement via le webhook Stripe.',
        }}
      />

      {data?.pagination && <Pagination pagination={data.pagination} onPageChange={setPage} />}

      <FormModal
        open={Boolean(opened)}
        onOpenChange={(o) => !o && setOpened(null)}
        title="Don"
        description={opened ? `${opened.donorName ?? 'Anonyme'} — ${opened.donorEmail ?? ''}` : undefined}
        className="max-w-3xl"
      >
        {opened && (
          <DonationDetail
            donation={opened}
            submitting={update.isPending}
            onSave={handleSave}
            onCancel={() => setOpened(null)}
          />
        )}
      </FormModal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
        title="Supprimer ce don ?"
        description={deleteTarget && (
          <span>
            Le don de <strong>{deleteTarget.donorName ?? 'Anonyme'}</strong> sera définitivement supprimé.
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