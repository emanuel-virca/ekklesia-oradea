import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Author } from '@shared/models/author';

// NgRx
import * as fromReducers from '@admin/authors/state';
import * as authorActions from '@admin/authors/state/author.actions';

@Component({
  selector: 'app-author-shell',
  templateUrl: './author-shell.component.html',
  styleUrls: ['./author-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorShellComponent implements OnInit {
  authors$: Observable<Author[]>;
  currentAuthor$: Observable<Author>;

  constructor(private store: Store<fromReducers.State>) {}

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

  deleteAuthor(authorId: string): void {
    this.store.dispatch(new authorActions.DeleteAuthor(authorId));
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
}
