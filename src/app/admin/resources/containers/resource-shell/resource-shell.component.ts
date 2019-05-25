import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { Resource } from '@shared/models/resource.model';

// NgRx
import * as fromResource from '@admin/resources/state';
import * as resourceActions from '@admin/resources/state/resource.actions';

@Component({
  selector: 'app-resource-shell',
  templateUrl: './resource-shell.component.html',
  styleUrls: ['./resource-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceShellComponent implements OnInit {
  resources$: Observable<Resource[]>;
  currentResource$: Observable<Resource>;

  constructor(private store: Store<fromResource.State>) {}

  ngOnInit() {
    this.store.dispatch(new resourceActions.LoadResources());
    this.resources$ = this.store.pipe(select(fromResource.getResources));
    this.currentResource$ = this.store.pipe(select(fromResource.getCurrentResource));
  }

  newResource(): void {
    this.store.dispatch(
      new resourceActions.SetCurrentResource({
        title: '',
        dateTime: null,
        description: '',
        hearthisId: null,
        downloadUrl: null,
        streamUrl: null,
        imageSrc: null,
        resourceType: null,
        author: null,
        height: null,
        width: null,
        published: false,
        tags: [],
      })
    );
  }

  selectResource(resource: Resource): void {
    this.store.dispatch(new resourceActions.SetCurrentResource(resource));
  }

  deleteResource(resourceId: string): void {
    this.store.dispatch(new resourceActions.DeleteResource(resourceId));
  }

  createResource(resource: Resource): void {
    this.store.dispatch(new resourceActions.CreateResource(resource));
  }

  updateResource(resource: Resource): void {
    this.store.dispatch(new resourceActions.UpdateResource(resource));
  }

  clearSelectedResource(): void {
    this.store.dispatch(new resourceActions.SetCurrentResource(null));
  }

  publishResource(resourceId: string): void {
    this.store.dispatch(new resourceActions.PublishResource(resourceId));
  }

  unpublishResource(resourceId: string): void {
    this.store.dispatch(new resourceActions.UnpublishResource(resourceId));
  }
}
