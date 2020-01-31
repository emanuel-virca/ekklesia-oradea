import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Tag } from '@shared/models/tag';

@Component({
  selector: 'app-resource-tags',
  templateUrl: './resource-tags.component.html',
  styleUrls: ['./resource-tags.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceTagsComponent {
  @Input() tags: Tag[];
}
