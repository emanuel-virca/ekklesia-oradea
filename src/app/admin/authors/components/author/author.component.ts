import { Component, OnInit, ChangeDetectionStrategy, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Author } from 'src/app/shared/models/author.model';
import { MatDialog } from '@angular/material';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorComponent implements OnInit, OnChanges {
  @Input() author: Author;
  @Output() create = new EventEmitter<Author>();
  @Output() update = new EventEmitter<Author>();
  @Output() delete = new EventEmitter();
  @Output() clearSelected = new EventEmitter();

  authorForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    description: new FormControl(),
    avatar: new FormControl(),
  });

  imageUploadFolder = '/authors';

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.author) {
      const author: any = changes.author.currentValue as Author;
      this.displayAuthor(author);
    }
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

  confirmDelete(): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        title: 'Are you shure you want to delete the following resource?',
        message: `${this.author.firstName} ${this.author.lastName}`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { this.deleteAuthor(); }
    });
  }

  deleteAuthor() {
    if (!this.author.id) { return; }

    this.delete.emit(this.author.id);
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
      this.create.emit(author);
    } else {
      this.update.emit(author);
    }
  }

  clearSelectedAuthor(): void {
    this.clearSelected.emit();
  }

  get firstName() { return this.authorForm.controls.firstName; }
  get lastName() { return this.authorForm.controls.lastName; }
  get avatar() { return this.authorForm.controls.avatar; }
}
