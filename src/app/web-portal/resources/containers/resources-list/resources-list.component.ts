import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { Resource } from '@shared/models/resource.model';
import { LoaderService } from '@core/services/loader/loader.service';

import * as fromResources from '@web-portal/resources/reducers';
import { ResourcesActions } from '@web-portal/resources/actions';

@Component({
  selector: 'app-resources-list',
  templateUrl: './resources-list.component.html',
  styleUrls: ['./resources-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourcesListComponent implements OnInit, OnDestroy {
  @ViewChild('masonryItemSizer') masonryItemSizer: ElementRef;

  loading = false;
  thereIsMore = true;
  resources$: Observable<Resource[]>;
  isFetching$: Observable<boolean>;
  loaderSubscription: Subscription;

  constructor(private loaderService: LoaderService, private store: Store<fromResources.State>) {
    this.resources$ = this.store.select(fromResources.getResources);
    this.store.select(fromResources.getResourcesNextPage).subscribe(x => (this.thereIsMore = x !== null));

    this.loaderSubscription = this.store.select(fromResources.getResourcesIsFetching).subscribe(isFetching => {
      isFetching ? this.loaderService.show() : this.loaderService.hide();
      this.loading = isFetching;
    });
  }

  ngOnInit() {
    this.store.dispatch(ResourcesActions.loadResources());
  }

  getNextResources() {
    if (this.loading || !this.thereIsMore) {
      return;
    }

    this.store.dispatch(ResourcesActions.loadResources());
  }

  ngOnDestroy() {
    this.loaderSubscription.unsubscribe();
  }
}
