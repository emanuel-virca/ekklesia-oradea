import { Component, OnInit, ViewChild, ChangeDetectionStrategy, Input, OnChanges } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSort } from '@angular/material';

import { Author } from 'src/app/shared/models/author.model';
import { ListEvents } from 'src/app/admin/shared/models/list-events.model';

@Component({
  selector: 'app-authors-list',
  templateUrl: './authors-list.component.html',
  styleUrls: ['./authors-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorsListComponent extends ListEvents<Author> implements OnInit, OnChanges {
  displayedColumns: string[] = ['position', 'avatar', 'firstName', 'lastName', 'actions'];
  dataSource = new MatTableDataSource<Author>();

  @Input() authors: Author[];

  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog) {
    super(dialog, {
      title: 'Are you shure you want to delete the following resource?',
      message: (author: Author) => `${author.firstName} ${author.lastName}`
    });
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnChanges() {
    this.dataSource.data = this.authors;
  }
}
