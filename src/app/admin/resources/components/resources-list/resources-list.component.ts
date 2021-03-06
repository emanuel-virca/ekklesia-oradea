import {
  Component,
  OnInit,
  ViewChild,
  Input,
  OnChanges,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

import { Resource } from '@shared/models/resource';
import { ListBaseComponent } from '@admin/shared/helpers/list-base.component';

@Component({
  selector: 'app-resources-list',
  templateUrl: './resources-list.component.html',
  styleUrls: ['./resources-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourcesListComponent extends ListBaseComponent<Resource> implements OnInit, OnChanges {
  displayedColumns: string[] = ['status', 'title', 'author', 'dateTime', 'actions'];
  dataSource = new MatTableDataSource<Resource>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @Input() resources: Resource[];

  @Output() publish = new EventEmitter();
  @Output() unpublish = new EventEmitter();

  constructor(public dialog: MatDialog) {
    super(dialog, { messageFn: (resource: Resource) => `You are about to delete <b>${resource.title}</b>` });
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  public publishResource(resource: Resource) {
    if (!resource) {
      return;
    }

    this.publish.emit(resource.id);
  }

  public unpublishResource(resource: Resource) {
    if (!resource) {
      return;
    }

    this.unpublish.emit(resource.id);
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnChanges() {
    this.dataSource.data = this.resources || [];
  }
}
