import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { Author } from 'src/app/shared/models/author.model';
import { AuthorService } from 'src/app/admin/authors/services/author/author.service';

@Component({
  selector: 'app-authors-list',
  templateUrl: './authors-list.component.html',
  styleUrls: ['./authors-list.component.scss']
})
export class AuthorsListComponent implements OnInit {

  displayedColumns: string[] = [ 'avatar', 'firstName', 'lastName', 'actions'];
  dataSource = new MatTableDataSource<Author>();

  constructor(private authorService: AuthorService) { }

  ngOnInit() {
    this.getAuthors();
  }

  getAuthors() {
    this.authorService.query().subscribe(data => this.dataSource.data = data);
  }

}
