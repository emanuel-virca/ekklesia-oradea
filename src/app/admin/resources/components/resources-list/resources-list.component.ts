import { Component, OnInit, ViewChild, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSort } from '@angular/material';

import { ResourceService } from 'src/app/admin/resources/services/resource/resource.service';
import { Resource } from 'src/app/shared/models/resource.model';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';


@Component({
  selector: 'app-resources-list',
  templateUrl: './resources-list.component.html',
  styleUrls: ['./resources-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResourcesListComponent implements OnInit, OnChanges {

  @ViewChild(MatSort) sort: MatSort;
  @Input() resources: Resource[];

  constructor(
    private resourceService: ResourceService,
    public dialog: MatDialog,
  ) { }

  displayedColumns: string[] = ['position', 'title', 'dateTime', 'author', 'actions'];
  dataSource = new MatTableDataSource<Resource>();

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  public async deleteAsync(resourceId) {
    await this.resourceService.deleteAsync(resourceId);
  }

  public confirmDelete(resource: Resource): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: { title: 'Are you shure you want to delete the following resource?', message: resource.title }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { this.deleteAsync(resource.id); }
    });
  }

  public async publish(resourceId) {
    await this.resourceService.publishAsync(resourceId);
  }

  public async unpublish(resourceId) {
    await this.resourceService.unpublishAsync(resourceId);
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnChanges() {
    this.dataSource.data = this.resources;
  }
}
