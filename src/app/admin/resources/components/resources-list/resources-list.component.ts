import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';

import { Resource } from '../../../../shared/models/resource.model';
import { ResourceService } from '../../services/resource/resource.service';
import { ConfirmModalComponent } from '../../../../shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-resources-list',
  templateUrl: './resources-list.component.html',
  styleUrls: ['./resources-list.component.css']
})
export class ResourcesListComponent implements OnInit {

  constructor(
    private resourceService: ResourceService,
    public dialog: MatDialog,
  ) { }

  displayedColumns: string[] = ['position', 'title', 'dateTime', 'author', 'actions'];
  dataSource = new MatTableDataSource<Resource>();

  ngOnInit() {
    this.getResources();
  }

  getResources() {
    this.resourceService.query(9999).subscribe(data => this.dataSource.data = data);
  }

  public async deleteAsync(resourceId) {
    await this.resourceService.deleteAsync(resourceId);
  }

  confirmDelete(resource: Resource): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: { title: 'Are you shure you want to delete the following resource?', message: resource.title }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { this.deleteAsync(resource.id); }
    });
  }
}
