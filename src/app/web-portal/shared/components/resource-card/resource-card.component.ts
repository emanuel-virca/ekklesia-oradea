import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';

import { ResourceSnippet, Resource } from '@shared/models/resource';

@Component({
  selector: 'app-resource-card',
  templateUrl: './resource-card.component.html',
  styleUrls: ['./resource-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceCardComponent implements OnInit, OnChanges {
  @Input() resource: ResourceSnippet | Resource;
  @Input() width;

  height: number;

  ngOnInit() {
    this.height = this.computeHeight();
  }

  computeHeight() {
    if (!this.resource || !this.resource.cover) {
      return 220;
    }

    return (this.resource.cover.height / this.resource.cover.width) * this.width || 220;
  }

  ngOnChanges(): void {
    this.height = this.computeHeight();
  }
}
