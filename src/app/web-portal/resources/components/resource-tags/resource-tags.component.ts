import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Tag } from '@shared/models/tag.model';

@Component({
  selector: 'app-resource-tags',
  templateUrl: './resource-tags.component.html',
  styleUrls: ['./resource-tags.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceTagsComponent {
  @Input() tags: Tag[];

  constructor(private router: Router) {}

  searchByTag(tagName: string) {
    this.router.navigate(['../resources/results', { search_query: tagName }]);
  }
}
