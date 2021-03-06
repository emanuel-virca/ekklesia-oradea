import { Component, OnInit, ViewChild, ChangeDetectionStrategy, Input, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

import { Author } from '@shared/models/author';
import { ListBaseComponent } from '@admin/shared/helpers/list-base.component';

@Component({
  selector: 'app-authors-list',
  templateUrl: './authors-list.component.html',
  styleUrls: ['./authors-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorsListComponent extends ListBaseComponent<Author> implements OnInit, OnChanges {
  displayedColumns: string[] = ['avatar', 'name', 'actions'];
  dataSource = new MatTableDataSource<Author>();

  @Input() authors: Author[];

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public dialog: MatDialog) {
    super(dialog, {
      messageFn: (author: Author) => `You are about to delete <b>${author.firstName} ${author.lastName}</b>`,
    });
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnChanges() {
    this.dataSource.data = this.authors || [];
  }
}
