import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';

import { Resource } from '@shared/models/resource.model';

@Component({
  selector: 'app-resource-card',
  templateUrl: './resource-card.component.html',
  styleUrls: ['./resource-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceCardComponent implements OnInit, OnChanges {
  @Input() resource: Resource;
  @Input() width;
  height: number;

  ngOnInit() {
    this.height = this.computeHeight();
  }

  computeHeight() {
    if (!this.resource) {
      return 0;
    }
    return (this.resource.height / this.resource.width) * this.width;
  }

  ngOnChanges(): void {
    this.height = this.computeHeight();
  }
}
