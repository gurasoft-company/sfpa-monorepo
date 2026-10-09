import { useEffect, useState } from 'react';
import { FolderKanban, Plus } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Pagination } from '@/components/common/Pagination';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { DataTable } from '@/components/data-table/DataTable';
import { FormModal } from '@/components/forms/FormModal';
import { ProjectsFilters } from '@/features/projects/ProjectsFilters';
import { ProjectForm } from '@/features/projects/ProjectForm';
import { buildProjectColumns } from '@/features/projects/ProjectColumns';
import { useProjectMutations } from '@/features/projects/useProjectMutations';
import { useProjects } from '@/features/projects/useProjects';
import { Button } from '@/components/ui/button';
import type { Project } from '@/services/projects.service';
import type { ProjectFormValues } from '@/schemas/project.schema';
import { canDelete, useAuthStore } from '@/store/auth.store';

const PAGE_SIZE = 10;

export default function ProjectsPage() {
  const deletable = canDelete(useAuthStore((s) => s.user?.role));
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [debounced, setDebounced] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);

  useEffect(() => {
    const t = setTimeout(() => { setDebounced(search); setPage(1); }, 300);
    return () => clearTimeout(t);
  }, [search]);

  const { data, isLoading } = useProjects({
    page, limit: PAGE_SIZE,
    category: category || undefined,
    search: debounced || undefined,
  });

  const closeForm = () => { setFormOpen(false); setEditing(null); };
  const { create, update, remove } = useProjectMutations(closeForm);

  const openCreate = () => { setEditing(null); setFormOpen(true); };
  const openEdit = (p: Project) => { setEditing(p); setFormOpen(true); };

  const handleSubmit = async (v: ProjectFormValues) => {
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

  const columns = buildProjectColumns({ onEdit: openEdit, onDelete: setDeleteTarget, canDelete: deletable });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Projets"
        description="Actions humanitaires et environnementales sur le terrain"
        action={
          <Button onClick={openCreate} className="bg-sfpa-terra hover:bg-sfpa-terra/90">
            <Plus className="h-4 w-4" /> Nouveau projet
          </Button>
        }
      />

      <ProjectsFilters
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
          icon: FolderKanban,
          title: search || category ? 'Aucun résultat' : 'Aucun projet',
          description: search || category
            ? 'Modifiez vos filtres ou votre recherche.'
            : 'Créez votre premier projet pour le voir apparaître ici.',
          action: !search && !category ? (
            <Button onClick={openCreate} variant="outline">
              <Plus className="h-4 w-4" /> Créer un projet
            </Button>
          ) : undefined,
        }}
      />

      {data?.pagination && <Pagination pagination={data.pagination} onPageChange={setPage} />}

      <FormModal
        open={formOpen}
        onOpenChange={(o) => { setFormOpen(o); if (!o) setEditing(null); }}
        title={editing ? 'Modifier le projet' : 'Nouveau projet'}
        description={editing ? `Modification de « ${editing.title} »` : undefined}
      >
        <ProjectForm
          project={editing}
          submitting={create.isPending || update.isPending}
          onSubmit={handleSubmit}
          onCancel={closeForm}
        />
      </FormModal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
        title="Supprimer ce projet ?"
        description={deleteTarget && <span>Le projet <strong>{deleteTarget.title}</strong> sera définitivement supprimé.</span>}
        confirmLabel="Supprimer"
        destructive
        loading={remove.isPending}
        onConfirm={handleDelete}
      />
    </div>
  );
}