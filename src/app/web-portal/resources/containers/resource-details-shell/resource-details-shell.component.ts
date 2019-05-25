import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { Resource } from '@shared/models/resource.model';

// NgRx
import * as fromResource from '../../state';
import * as resourceActions from '../../state/resource.actions';

@Component({
  selector: 'app-resource-details-shell',
  templateUrl: './resource-details-shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceDetailsShellComponent implements OnInit {
  currentResource$: Observable<Resource>;

  constructor(private route: ActivatedRoute, private store: Store<fromResource.State>) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) =>
      this.store.dispatch(new resourceActions.LoadResource(params.get('id')))
    );
    this.currentResource$ = this.store.pipe(select(fromResource.getCurrentResource));
  }
}
