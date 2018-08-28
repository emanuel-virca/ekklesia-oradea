import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { AuthorBaseComponent } from '../author-base.component';
import { Author } from 'src/app/shared/models/author.model';
import { AuthorService } from '../../services/author/author.service';

@Component({
  selector: 'app-create-author',
  templateUrl: './create-author.component.html',
  styleUrls: ['./create-author.component.scss']
})
export class CreateAuthorComponent extends AuthorBaseComponent implements OnInit {

  constructor(
    private authorService: AuthorService,
    public snackBar: MatSnackBar,
  ) {
    super();
  }

  ngOnInit() {
  }

  async save() {
    // if (!this.authorForm.dirty || !this.authorForm.valid) { return; }

    const author: Author = {
      firstName: this.authorForm.controls.firstName.value,
      lastName: this.authorForm.controls.lastName.value,
      avatar: this.authorForm.controls.avatar.value,
    };

    try {
      await this.authorService.createAsync(author);

      // TODO create notification service
      this.snackBar.open('Data sucessfully saved', null, { duration: 5000, });

      this.hardResetForm();

    } catch (e) {
      this.snackBar.open('An error occured while savind data!', null, { duration: 5000, });
    }
  }

}
