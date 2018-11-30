import { Component, ChangeDetectionStrategy, Input, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { Author } from 'src/app/shared/models/author.model';
import { ListItemEvents } from 'src/app/admin/shared/models/list-item-events.model';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorComponent extends ListItemEvents<Author> implements OnChanges {
  @Input() author: Author;

  authorForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    description: new FormControl(),
    avatar: new FormControl(),
  });

  imageUploadFolder = '/authors';

  constructor(
    public dialog: MatDialog,
  ) {
    super(dialog, { messageFn: (author: Author) => `You are about to delete <b>${author.firstName} ${author.lastName}</b>` });
  }

  displayAuthor(author: Author | null): void {
    // Set the local product property
    this.author = author;

    if (this.author && this.authorForm) {
      // Reset the form back to pristine
      this.authorForm.reset();

      // Update the data on the form
      this.authorForm.patchValue({
        firstName: this.author.firstName,
        lastName: this.author.lastName,
        avatar: this.author.avatar
      });
    }
  }

  imageSrcChanged(imageSrc) {
    this.authorForm.markAsDirty();
    this.authorForm.controls.avatar.setValue(imageSrc);
  }

  save() {
    if (!this.authorForm.valid) { return; }

    // Copy over all of the original author properties
    // Then copy over the values from the form
    // This ensures values not on the form, such as the Id, are retained
    const author: Author = { ...this.author, ...this.authorForm.value };

    if (!author.id) {
      this.createItem(author);
    } else {
      this.updateItem(author);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.author) {
      const author: any = changes.author.currentValue as Author;
      this.displayAuthor(author);
    }
  }

  get firstName() { return this.authorForm.controls.firstName; }
  get lastName() { return this.authorForm.controls.lastName; }
  get avatar() { return this.authorForm.controls.avatar; }
}
