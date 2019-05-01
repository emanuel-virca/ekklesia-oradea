import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';

import { Resource } from '@shared/models/resource.model';
import { LoaderService } from '@core/services/loader/loader.service';
import { ResourceService } from '@web-portal/resources/services/resource/resource.service';
import { of } from 'rxjs';

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

  getNextResources() {
    if (this.loading || !this.thereIsMore) {
      return;
    }

    this.loading = true;
    this.loaderService.show();

    this.resourceService
      .query(this.pageSize, this.lastVisible, 'desc')
      .pipe(
        tap(resources => this.onNextResource(resources)),
        tap(() => {
          this.loading = false;
          this.loaderService.hide();
        }),
        catchError(err => {
          this.loading = false;
          this.loaderService.hide();
          console.log('could not load resources');
          return of(null);
        })
      )
      .subscribe();
  }

  private onNextResource(items: Resource[]) {
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
  }
}
