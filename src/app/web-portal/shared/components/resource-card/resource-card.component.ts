import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

import { ResourceSnippet } from '@shared/models/resource';

@Component({
  selector: 'app-resource-card',
  templateUrl: './resource-card.component.html',
  styleUrls: ['./resource-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceCardComponent implements OnInit, OnChanges {
  @Input() resource: ResourceSnippet;
  @Input() width;
  @Input() inLibrary = false;
  @Output() saveToLibrary = new EventEmitter<ResourceSnippet>();
  @Output() removeFromLibrary = new EventEmitter<ResourceSnippet>();

  height: number;

  ngOnInit() {
    this.height = this.computeHeight();
  }

  computeHeight() {
    if (!this.resource || !this.resource.cover) {
      return 0;
    }

    return (this.resource.cover.height / this.resource.cover.width) * this.width;
  }

  onSaveToLibrary(resource: ResourceSnippet) {
    this.saveToLibrary.emit(resource);
  }

  onRemoveFromLibrary(resource: ResourceSnippet) {
    this.removeFromLibrary.emit(resource);
  }

  ngOnChanges(): void {
    this.height = this.computeHeight();
  }
}
