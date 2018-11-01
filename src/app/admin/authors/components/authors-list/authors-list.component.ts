import { Component, OnInit, ViewChild, ChangeDetectionStrategy, OnDestroy, EventEmitter, Output, Input, OnChanges } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSort } from '@angular/material';

import { Author } from 'src/app/shared/models/author.model';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-authors-list',
  templateUrl: './authors-list.component.html',
  styleUrls: ['./authors-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorsListComponent implements OnInit, OnChanges {
  displayedColumns: string[] = ['position', 'avatar', 'firstName', 'lastName', 'actions'];
  dataSource = new MatTableDataSource<Author>();

  @Input() authors: Author[];
  @Output() select = new EventEmitter<Author>();
  @Output() delete = new EventEmitter<Author>();
  @Output() initializeNew = new EventEmitter<void>();
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  newAuthor(): void {
    this.initializeNew.emit();
  }

  selectAuthor(author: Author): void {
    this.select.emit(author);
  }

  deleteAuthor(author: Author): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: { title: 'Are you shure you want to delete the following author?', message: `${author.firstName} ${author.lastName}` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { this.delete.emit(author); }
    });
  }

  ngOnChanges() {
    this.dataSource.data = this.authors;
  }
}
