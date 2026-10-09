import { useEffect, useState } from 'react';
import { Newspaper, Plus } from 'lucide-react';

import { PageHeader } from '@/components/common/PageHeader';
import { Pagination } from '@/components/common/Pagination';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { DataTable } from '@/components/data-table/DataTable';
import { FormModal } from '@/components/forms/FormModal';
import { PostsFilters } from '@/features/posts/PostsFilters';
import { PostForm } from '@/features/posts/PostForm';
import { buildPostColumns } from '@/features/posts/PostColumns';
import { usePosts } from '@/features/posts/usePosts';
import { usePostMutations } from '@/features/posts/usePostMutations';
import { Button } from '@/components/ui/button';

import type { Post } from '@/services/posts.service';
import type { PostFormValues } from '@/schemas/post.schema';
import { canDelete, useAuthStore } from '@/store/auth.store';

const PAGE_SIZE = 10;

export default function PostsPage() {
  const deletable = canDelete(useAuthStore((s) => s.user?.role));
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [debounced, setDebounced] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Post | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Post | null>(null);

  useEffect(() => {
    const t = setTimeout(() => { setDebounced(search); setPage(1); }, 300);
    return () => clearTimeout(t);
  }, [search]);

  const { data, isLoading } = usePosts({
    page, limit: PAGE_SIZE,
    category: category || undefined,
    search: debounced || undefined,
  });

  const closeForm = () => { setFormOpen(false); setEditing(null); };
  const { create, update, remove } = usePostMutations(closeForm);

  const openCreate = () => { setEditing(null); setFormOpen(true); };
  const openEdit = (p: Post) => { setEditing(p); setFormOpen(true); };

  const handleSubmit = async (v: PostFormValues) => {
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

  const columns = buildPostColumns({
    onEdit: openEdit,
    onDelete: setDeleteTarget,
    canDelete: deletable,
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Articles"
        description="Actualités, événements et rapports du blog"
        action={
          <Button onClick={openCreate} className="bg-sfpa-terra hover:bg-sfpa-terra/90">
            <Plus className="h-4 w-4" /> Nouvel article
          </Button>
        }
      />

      <PostsFilters
        search={search}
        category={category}
        total={data?.pagination.total}
        onSearchChange={setSearch}
        onCategoryChange={(v) => { setCategory(v); setPage(1); }}
      />

      <DataTable
        columns={columns}
        data={data?.items ?? []}
        rowKey={(p) => p.id}
        loading={isLoading}
        onRowClick={openEdit}
        emptyState={{
          icon: Newspaper,
          title: search || category ? 'Aucun résultat' : 'Aucun article',
          description: search || category
            ? 'Modifiez vos filtres ou votre recherche.'
            : 'Écrivez votre premier article pour le voir apparaître ici.',
          action: !search && !category ? (
            <Button onClick={openCreate} variant="outline">
              <Plus className="h-4 w-4" /> Créer un article
            </Button>
          ) : undefined,
        }}
      />

      {data?.pagination && <Pagination pagination={data.pagination} onPageChange={setPage} />}

      <FormModal
        open={formOpen}
        onOpenChange={(o) => { setFormOpen(o); if (!o) setEditing(null); }}
        title={editing ? 'Modifier l\'article' : 'Nouvel article'}
        description={editing ? `Modification de « ${editing.title} »` : undefined}
        className="max-w-4xl"
      >
        <PostForm
          post={editing}
          submitting={create.isPending || update.isPending}
          onSubmit={handleSubmit}
          onCancel={closeForm}
        />
      </FormModal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
        title="Supprimer cet article ?"
        description={deleteTarget && (
          <span>
            L'article <strong>{deleteTarget.title}</strong> sera définitivement supprimé.
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