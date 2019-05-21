import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Resource } from '@shared/models/resource.model';
import { SeoService } from '@web-portal/core/services/seo/seo.service';

@Component({
  selector: 'app-resource-details',
  templateUrl: './resource-details.component.html',
  styleUrls: ['./resource-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceDetailsComponent implements OnInit, OnChanges {
  @Input() resource: Resource;

  constructor(private seo: SeoService) {
    if (!this.resource) {
      return;
    }
  }

  ngOnInit() {
    if (!this.resource) {
      return;
    }

    this.seo.generateTags({
      title: this.resource.title,
      description: this.resource.description,
      image: this.resource.imageSrc,
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);

    if (!changes.resource.currentValue != null) {
      return;
    }

    this.seo.generateTags({
      title: this.resource.title,
      description: this.resource.description,
      image: this.resource.imageSrc,
    });
  }
}
