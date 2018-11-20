import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { Resource } from 'src/app/shared/models/resource.model';

// NgRx
import * as fromResource from '../../state';
import * as resourceActions from '../../state/resource.actions';

@Component({
  selector: 'app-resource-shell',
  templateUrl: './resource-shell.component.html',
  styleUrls: ['./resource-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResourceShellComponent implements OnInit {
  resources$: Observable<Resource[]>;

  constructor(
    private store: Store<fromResource.AppState>,
  ) { }

  ngOnInit() {
    this.store.dispatch(new resourceActions.LoadResources());
    this.resources$ = this.store.pipe(select(fromResource.getResources));
  }

}
