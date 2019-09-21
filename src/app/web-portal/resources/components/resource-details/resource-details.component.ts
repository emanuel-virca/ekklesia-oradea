import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { Resource } from '@shared/models/resource.model';

@Component({
  selector: 'app-resource-details',
  templateUrl: './resource-details.component.html',
  styleUrls: ['./resource-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceDetailsComponent {
  @Input() resource: Resource;
}
