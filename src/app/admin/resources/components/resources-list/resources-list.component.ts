import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { Resource } from '../../../../shared/models/resource.model';
import { ResourceService } from '../../services/resource/resource.service';

@Component({
  selector: 'app-resources-list',
  templateUrl: './resources-list.component.html',
  styleUrls: ['./resources-list.component.css']
})
export class ResourcesListComponent implements OnInit {

  constructor(private resourceService: ResourceService) { }

  displayedColumns: string[] = ['position', 'title', 'dateTime', 'author', 'actions'];
  dataSource = new MatTableDataSource<Resource>();

  ngOnInit() {
    this.getResources();
  }

  getResources() {
    this.resourceService.query(9999).subscribe(data => this.dataSource.data = data);
  }
}
