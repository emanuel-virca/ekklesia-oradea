import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FileService } from '@admin/core/services/file/file.service';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
})
export class ImageUploaderComponent implements OnInit {
  uploading = false;

  @Output() urlChanged = new EventEmitter<string>();

  @Input() url: string;
  @Input() folder = 'common';

  constructor(private afStorage: AngularFireStorage, private fileService: FileService, private snackBar: MatSnackBar) {}

  ngOnInit() {}

  public async deleteAsync() {
    if (!this.url) {
      return;
    }

    if (!this.isFirebaseStorageFile()) {
      this.url = null;
      this.urlChanged.emit(this.url);
      return;
    }

    try {
      const fileRef = this.afStorage.storage.refFromURL(this.url);
      await fileRef.delete();
      this.url = null;
      this.urlChanged.emit(this.url);
    } catch (ex) {
      this.snackBar.open('Unable to delete file!');
      console.log(ex);
    }
  }

  public async uploadAsync(event) {
    this.uploading = true;

    const file = event.target.files[0];

    try {
      this.url = await this.fileService.uploadAsync(this.folder, file);
      this.urlChanged.emit(this.url);
    } catch (ex) {
      this.snackBar.open('Unable to upload file!');
      this.urlChanged.emit('');
      console.log(ex);
    } finally {
      this.uploading = false;
    }
  }

  private isFirebaseStorageFile(): boolean {
    return this.url && this.url.startsWith('https://firebasestorage.googleapis.com');
  }
}
