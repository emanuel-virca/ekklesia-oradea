import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSort } from '@angular/material';

import { ResourceService } from 'src/app/admin/resources/services/resource/resource.service';
import { Resource } from 'src/app/shared/models/resource.model';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';


@Component({
  selector: 'app-resources-list',
  templateUrl: './resources-list.component.html',
  styleUrls: ['./resources-list.component.scss']
})
export class ResourcesListComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private resourceService: ResourceService,
    public dialog: MatDialog,
  ) { }

  displayedColumns: string[] = ['position', 'title', 'dateTime', 'author', 'actions'];
  dataSource = new MatTableDataSource<Resource>();

  ngOnInit() {
    this.getResources();
    this.dataSource.sort = this.sort;
  }

  public getResources() {
    this.resourceService.query(9999, null, 'desc').subscribe(data => this.dataSource.data = data);
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

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
