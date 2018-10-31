import { Component, OnInit, ViewChild, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSort } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Author } from 'src/app/shared/models/author.model';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';

// NgRx
import * as fromReducers from '../../state';
import * as authorActions from '../../state/author.actions';

@Component({
  selector: 'app-authors-list',
  templateUrl: './authors-list.component.html',
  styleUrls: ['./authors-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorsListComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();

  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['position', 'avatar', 'firstName', 'lastName', 'actions'];
  dataSource = new MatTableDataSource<Author>();

  constructor(
    public dialog: MatDialog,
    private store: Store<fromReducers.AppState>
  ) { }

  ngOnInit() {
    this.store
      .pipe(select(fromReducers.getAuthors), takeUntil(this.unsubscribe$))
      .subscribe(data => (this.dataSource.data = data));
    this.dataSource.sort = this.sort;

    this.getAuthors();
  }

  public getAuthors(): void {
    this.store.dispatch(new authorActions.LoadAuthors());
  }

  public confirmDelete(author: Author): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: { title: 'Are you shure you want to delete the following author?', message: `${author.firstName} ${author.lastName}` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { this.deleteAuthor(author.id); }
    });
  }

  public deleteAuthor(authorId: string): void {
    this.store.dispatch(new authorActions.DeleteAuthor(authorId));
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
