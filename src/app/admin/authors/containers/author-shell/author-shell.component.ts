import { Component, OnInit, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Author } from 'src/app/shared/models/author.model';

// NgRx
import * as fromReducers from '../../state';
import * as authorActions from '../../state/author.actions';

@Component({
  selector: 'app-author-shell',
  templateUrl: './author-shell.component.html',
  styleUrls: ['./author-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorShellComponent implements OnInit {
  @HostBinding('class') classes = 'height-inherit';
  authors$: Observable<Author[]>;
  currentAuthor$: Observable<Author>;

  constructor(
    private store: Store<fromReducers.AppState>,
  ) { }

  ngOnInit() {
    this.store.dispatch(new authorActions.LoadAuthors());
    this.authors$ = this.store.pipe(select(fromReducers.getAuthors));
    this.currentAuthor$ = this.store.pipe(select(fromReducers.getCurrentAuthor));
  }

  newAuthor(): void {
    this.store.dispatch(new authorActions.SetCurrentAuthor({ avatar: null, firstName: null, lastName: null }));
  }

  selectAuthor(author: Author): void {
    this.store.dispatch(new authorActions.SetCurrentAuthor(author));
  }

  deleteAuthor(author: Author): void {
    this.store.dispatch(new authorActions.DeleteAuthor(author.id));
  }

  createAuthor(author: Author): void {
    this.store.dispatch(new authorActions.CreateAuthor(author));
  }

  updateAuthor(author: Author): void {
    this.store.dispatch(new authorActions.UpdateAuthor(author));
  }

  clearSelectedAuthor(): void {
    this.store.dispatch(new authorActions.SetCurrentAuthor(null));
  }

  resetEdit(author: Author): void {
    this.store.dispatch(new authorActions.SetCurrentAuthor(author));
  }

}
