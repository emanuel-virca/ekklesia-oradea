import { Component, OnInit, ViewChild, Input, OnChanges, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSort } from '@angular/material';

import { Resource } from 'src/app/shared/models/resource.model';
import { ListEvents } from 'src/app/admin/shared/models/list-events.model';


@Component({
  selector: 'app-resources-list',
  templateUrl: './resources-list.component.html',
  styleUrls: ['./resources-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResourcesListComponent extends ListEvents<Resource> implements OnInit, OnChanges {
  displayedColumns: string[] = ['position', 'title', 'dateTime', 'author', 'actions'];
  dataSource = new MatTableDataSource<Resource>();

  @ViewChild(MatSort) sort: MatSort;
  @Input() resources: Resource[];
  @Output() publish = new EventEmitter();
  @Output() unpublish = new EventEmitter();

  constructor(
    public dialog: MatDialog,
  ) {
    super(dialog, { messageFn: (resource: Resource) => `You are about to delete <b>${resource.title}</b>` });
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  public publishResource(resource: Resource) {
    if (!resource) { return; }

    this.publish.emit(resource.id);
  }

  public unpublishResource(resource: Resource) {
    if (!resource) { return; }

    this.unpublish.emit(resource.id);
  }

  public deleteResource(resourceId: string) {
    if (!resourceId) { return; }

    this.delete.emit(resourceId);
  }

  public newResource(): void {
    this.initializeNew.emit();
  }

  public selectResource(resource: Resource): void {
    this.select.emit(resource);
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnChanges() {
    this.dataSource.data = this.resources;
  }
}
