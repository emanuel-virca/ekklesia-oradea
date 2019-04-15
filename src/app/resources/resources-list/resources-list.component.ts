import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { LoaderService } from '@core/services/loader/loader.service';
import { Resource } from '@shared/models/resource.model';
import { ResourceService } from '@shared/services/resource/resource.service';

@Component({
  selector: 'app-resources-list',
  templateUrl: './resources-list.component.html',
  styleUrls: ['./resources-list.component.scss'],
})
export class ResourcesListComponent implements OnInit {
  @ViewChild('masonryItemSizer') masonryItemSizer: ElementRef;

  resources: Resource[] = new Array<Resource>();
  lastVisible: Resource;
  pageSize = 20;
  loading = false;
  thereIsMore = true;

  constructor(private resourceService: ResourceService, private loaderService: LoaderService) {}

  ngOnInit() {
    this.getNextResources();
  }

  onScroll() {
    if (!this.loading && this.thereIsMore) {
      this.getNextResources();
    }
  }

  private getNextResources() {
    // TODO move loader
    this.loading = true;
    this.loaderService.show();

    this.resourceService.query(this.pageSize, this.lastVisible, 'desc').subscribe(
      (items: Resource[]) => {
        if (!items || !items.length) {
          return;
        }

        const nextResources = new Array<Resource>();

        items.forEach(item => {
          const indexOfExisting = this.resources.findIndex(x => x.id === item.id);

          if (indexOfExisting !== -1) {
            this.resources[indexOfExisting] = item;
          } else {
            nextResources.push(item);
          }
        });

        this.resources = this.resources.concat(nextResources);

        this.lastVisible = items[items.length - 1];

        if (items.length < this.pageSize) {
          this.thereIsMore = false;
        }

        this.loading = false;
        this.loaderService.hide();
      },
      () => {
        this.loading = false;
        this.loaderService.hide();
      }
    );
  }
}
