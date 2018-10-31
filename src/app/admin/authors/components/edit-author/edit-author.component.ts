import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { takeUntil, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { AuthorBaseComponent } from '../author-base.component';
import { Author } from 'src/app/shared/models/author.model';

// NgRx
import * as fromReducers from '../../state';
import * as fromActions from '../../state/author.actions';
import { AuthorEffects } from '../../state/author.effects';

@Component({
  selector: 'app-edit-author',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditAuthorComponent extends AuthorBaseComponent implements OnInit, OnDestroy {
  author: Author;
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    public snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private store: Store<fromReducers.AppState>,
    private authorEffects: AuthorEffects,
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.route.paramMap.subscribe((params: ParamMap) => this.getResource(params.get('id')));

    this.authorEffects.updateAuthor$.pipe(
      filter(action => action.type === fromActions.UPDATE_AUTHOR_SUCCESS),
      takeUntil(this.unsubscribe$)
    ).subscribe(res => this.onSuccess());

    this.authorEffects.updateAuthor$.pipe(
      filter(action => action.type === fromActions.UPDATE_AUTHOR_FAIL),
      takeUntil(this.unsubscribe$)
    ).subscribe(res => this.onError());
  }

  getResource(id) {
    this.store.dispatch(new fromActions.LoadAuthor(id));
    this.store.pipe(
      select(fromReducers.getCurrentAuthor),
      takeUntil(this.unsubscribe$)
    ).subscribe(
      currentAuthor => this.displayAuthor(currentAuthor)
    );
  }

  displayAuthor(author: Author | null): void {
    // Set the local product property
    this.author = author;

    if (this.author) {
      // Reset the form back to pristine
      this.authorForm.reset();

      // Update the data on the form
      this.authorForm.patchValue({
        firstName: this.author.firstName,
        lastName: this.author.lastName,
        avatar: this.author.avatar
      });
    }
  }

  async save() {
    if (!this.authorForm.dirty || !this.authorForm.valid) { return; }

    // Copy over all of the original author properties
    // Then copy over the values from the form
    // This ensures values not on the form, such as the Id, are retained
    const author: Author = { ...this.author, ...this.authorForm.value };

    this.store.dispatch(new fromActions.UpdateAuthor(author));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSuccess(): void {
    this.snackBar.open('Data sucessfully saved', null, { duration: 5000, });
    this.resetForm();
  }

  onError(): void {
    this.snackBar.open('An error occured while savind data!', null, { duration: 5000, });
  }
}
