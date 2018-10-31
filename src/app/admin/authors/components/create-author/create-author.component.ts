import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';
import { takeUntil, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { AuthorBaseComponent } from '../author-base.component';
import { Author } from 'src/app/shared/models/author.model';

// NgRx
import * as fromReducers from '../../state';
import * as fromActions from '../../state/author.actions';
import { AuthorEffects } from '../../state/author.effects';

@Component({
  selector: 'app-create-author',
  templateUrl: './create-author.component.html',
  styleUrls: ['./create-author.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateAuthorComponent extends AuthorBaseComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private store: Store<fromReducers.AppState>,
    private authorEffects: AuthorEffects,
    public snackBar: MatSnackBar,
  ) {
    super();
  }

  ngOnInit() {
    this.authorEffects.createAuthor$.pipe(
      filter(action => action.type === fromActions.CREATE_AUTHOR_SUCCESS),
      takeUntil(this.unsubscribe$)
    ).subscribe(res => this.onSuccess());

    this.authorEffects.createAuthor$.pipe(
      filter(action => action.type === fromActions.CREATE_AUTHOR_FAIL),
      takeUntil(this.unsubscribe$)
    ).subscribe(res => this.onError());
  }

  async save() {
    if (!this.authorForm.dirty || !this.authorForm.valid) { return; }

    // Copy over the values from the form
    const author: Author = { ...this.authorForm.value };

    this.store.dispatch(new fromActions.CreateAuthor(author));
  }

  onSuccess(): void {
    this.snackBar.open('Data sucessfully saved', null, { duration: 5000, });
    this.hardResetForm();
  }

  onError(): void {
    this.snackBar.open('An error occured while savind data!', null, { duration: 5000, });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
