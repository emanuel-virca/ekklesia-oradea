import { ResourceType } from '@shared/models/resource-type.model';
import { SelectOption } from '@admin/shared/models/select-option';

export const ResourceTypeSelect: Array<SelectOption> = [
  { text: 'Audio', value: ResourceType.Audio },
  { text: 'Video', value: ResourceType.Video },
  { text: 'Article', value: ResourceType.Article },
];
