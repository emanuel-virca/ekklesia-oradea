import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';

import { Author } from 'src/app/shared/models/author.model';
import { AuthorService } from 'src/app/admin/authors/services/author/author.service';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-authors-list',
  templateUrl: './authors-list.component.html',
  styleUrls: ['./authors-list.component.scss']
})
export class AuthorsListComponent implements OnInit {

  displayedColumns: string[] = ['avatar', 'firstName', 'lastName', 'actions'];
  dataSource = new MatTableDataSource<Author>();

  constructor(
    private authorService: AuthorService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getAuthors();
  }

  getAuthors() {
    this.authorService.query().subscribe(data => this.dataSource.data = data);
  }

  public async deleteAsync(authorId) {
    await this.authorService.deleteAsync(authorId);
  }

  confirmDelete(author: Author): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: { title: 'Are you shure you want to delete the following author?', message: `${author.firstName} ${author.lastName}` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { this.deleteAsync(author.id); }
    });
  }

}
