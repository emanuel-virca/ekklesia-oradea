import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

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
  @Input() inLibrary = false;
  @Output() saveToLibrary = new EventEmitter<Resource>();
  @Output() removeFromLibrary = new EventEmitter<Resource>();

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

  onSaveToLibrary(resource: Resource) {
    this.saveToLibrary.emit(resource);
  }

  onRemoveFromLibrary(resource: Resource) {
    this.removeFromLibrary.emit(resource);
  }

  ngOnChanges(): void {
    this.height = this.computeHeight();
  }
}
