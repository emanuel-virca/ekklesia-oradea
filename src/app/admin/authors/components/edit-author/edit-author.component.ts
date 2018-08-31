import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { AuthorBaseComponent } from '../author-base.component';
import { Author } from 'src/app/shared/models/author.model';
import { AuthorService } from 'src/app/admin/authors/services/author/author.service';

@Component({
  selector: 'app-edit-author',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.scss']
})
export class EditAuthorComponent extends AuthorBaseComponent implements OnInit {

  author: Author;

  constructor(
    private authorService: AuthorService,
    public snackBar: MatSnackBar,
    private route: ActivatedRoute,
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.route.paramMap.subscribe((params: ParamMap) => this.getResource(params.get('id')));
  }

  getResource(id) {
    this.authorService.get(id).subscribe((author: Author) => {
      this.author = author;
      this.authorForm.controls.firstName.setValue(author.firstName);
      this.authorForm.controls.lastName.setValue(author.lastName);
      this.authorForm.controls.avatar.setValue(author.avatar);
    });
  }

  async save() {
    if (!this.authorForm.dirty || !this.authorForm.valid) { return; }

    const author: Author = {
      id: this.author.id,
      firstName: this.authorForm.controls.firstName.value,
      lastName: this.authorForm.controls.lastName.value,
      avatar: this.authorForm.controls.avatar.value,
    };

    try {
      await this.authorService.updateAsync(author);

      // TODO create notification service
      this.snackBar.open('Data sucessfully saved', null, { duration: 5000, });

      this.resetForm();

    } catch (e) {
      this.snackBar.open('An error occured while savind data!', null, { duration: 5000, });
    }
  }

}
