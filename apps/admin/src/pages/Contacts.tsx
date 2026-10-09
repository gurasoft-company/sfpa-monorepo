import { useEffect, useState } from 'react';
import { Mail } from 'lucide-react';

import { PageHeader } from '@/components/common/PageHeader';
import { Pagination } from '@/components/common/Pagination';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { DataTable } from '@/components/data-table/DataTable';
import { FormModal } from '@/components/forms/FormModal';
import { ContactsFilters } from '@/features/contacts/ContactsFilters';
import { ContactDetail } from '@/features/contacts/ContactDetail';
import { buildContactColumns } from '@/features/contacts/ContactColumns';
import { useContacts } from '@/features/contacts/useContacts';
import { useContactMutations } from '@/features/contacts/useContactMutations';

import type { Contact } from '@/services/contacts.service';
import type { ContactFormValues } from '@/schemas/contact.schema';
import { canDelete, useAuthStore } from '@/store/auth.store';

const PAGE_SIZE = 10;

export default function ContactsPage() {
  const deletable = canDelete(useAuthStore((s) => s.user?.role));
  const [page, setPage] = useState(1);
  const [isRead, setIsRead] = useState('');
  const [search, setSearch] = useState('');
  const [debounced, setDebounced] = useState('');
  const [opened, setOpened] = useState<Contact | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Contact | null>(null);

  useEffect(() => {
    const t = setTimeout(() => { setDebounced(search); setPage(1); }, 300);
    return () => clearTimeout(t);
  }, [search]);

  const { data, isLoading } = useContacts({
    page, limit: PAGE_SIZE,
    isRead: isRead === '' ? undefined : isRead === 'true',
    search: debounced || undefined,
  });

  const { update, remove } = useContactMutations(() => setOpened(null));

  const handleSave = async (v: ContactFormValues) => {
    if (!opened) return;
    await update.mutateAsync({ id: opened.id, values: v });
  };

  const handleToggleRead = async (next: boolean) => {
    if (!opened) return;
    await update.mutateAsync({ id: opened.id, values: { isRead: next } });
    setOpened({ ...opened, isRead: next });
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await remove.mutateAsync(deleteTarget.id);
      setDeleteTarget(null);
      if (opened?.id === deleteTarget.id) setOpened(null);
    } catch { /* toast géré */ }
  };

  const columns = buildContactColumns({
    onOpen: setOpened,
    onDelete: setDeleteTarget,
    canDelete: deletable,
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Messages"
        description="Boîte de réception du formulaire de contact"
      />

      <ContactsFilters
        search={search}
        isRead={isRead}
        total={data?.pagination.total}
        onSearchChange={setSearch}
        onReadChange={(v) => { setIsRead(v); setPage(1); }}
      />

      <DataTable
        columns={columns}
        data={data?.items ?? []}
        rowKey={(c) => c.id}
        loading={isLoading}
        onRowClick={setOpened}
        rowClassName={(c) => (!c.isRead ? 'bg-sfpa-terra/5' : undefined)}
        emptyState={{
          icon: Mail,
          title: search || isRead ? 'Aucun résultat' : 'Boîte vide',
          description: search || isRead
            ? 'Modifiez vos filtres ou votre recherche.'
            : 'Les messages du formulaire public apparaîtront ici.',
        }}
      />

      {data?.pagination && <Pagination pagination={data.pagination} onPageChange={setPage} />}

      <FormModal
        open={Boolean(opened)}
        onOpenChange={(o) => !o && setOpened(null)}
        title="Message"
        description={opened?.subject}
        className="max-w-3xl"
      >
        {opened && (
          <ContactDetail
            contact={opened}
            submitting={update.isPending}
            onSave={handleSave}
            onDelete={() => setDeleteTarget(opened)}
            onToggleRead={handleToggleRead}
            onClose={() => setOpened(null)}
          />
        )}
      </FormModal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
        title="Supprimer ce message ?"
        description={deleteTarget && (
          <span>
            Le message de <strong>{deleteTarget.name}</strong> sera définitivement supprimé.
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