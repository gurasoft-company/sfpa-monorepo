import { FormField } from '@/components/forms/FormField';
import { ImagePickerButton, type MediaPreview } from '@/components/media/ImagePickerButton';

interface Props {
  value: MediaPreview | null;
  onChange: (m: MediaPreview | null) => void;
}

export function ProjectCoverField({ value, onChange }: Props) {
  return (
    <FormField label="Image de couverture" hint="Format 16:9 recommandé">
      <ImagePickerButton value={value} onChange={onChange} folder="projects" label="Choisir une couverture" />
    </FormField>
  );
}