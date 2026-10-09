import { Switch } from '@/components/ui/switch';

export function ProjectPublishField({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between rounded-lg border bg-muted/30 px-4 py-3">
      <div>
        <p className="text-sm font-medium">Publier ce projet</p>
        <p className="text-xs text-muted-foreground">Visible sur le site public</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}