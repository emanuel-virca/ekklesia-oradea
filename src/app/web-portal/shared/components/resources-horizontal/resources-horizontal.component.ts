import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { ResourceSnippet } from '@shared/models/resource';

@Component({
  selector: 'app-resources-horizontal',
  templateUrl: './resources-horizontal.component.html',
  styleUrls: ['./resources-horizontal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourcesHorizontalComponent implements OnInit {
  @Input() resources: ResourceSnippet[];
  @Input() loading: boolean;
  @Input() height = 220;

  constructor() {}

  ngOnInit() {}

  computeWidth(resource: ResourceSnippet) {
    if (!resource || !resource.cover) {
      return this.height;
    }

    // (original height / original width) x new width = new height
    return this.height / (resource.cover.height / resource.cover.width);
  }

  getRandomWidth() {
    return this.getRandomArbitrary(150, 400);
  }

  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
}
