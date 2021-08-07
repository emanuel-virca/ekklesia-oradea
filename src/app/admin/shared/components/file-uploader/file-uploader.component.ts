import { FileService } from '@admin/core/services/file/file.service';
import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploaderComponent implements OnInit {
  uploading = false;

  @Output() urlChanged = new EventEmitter<string>();

  @Input() url: string;
  @Input() folder = 'audio';
  @Input() accept = '.mp3';

  constructor(private afStorage: AngularFireStorage, private fileService: FileService, private snackBar: MatSnackBar) {}

  ngOnInit() {}

  public async deleteAsync() {
    if (!this.url) {
      return;
    }

    this.urlChanged.emit(null);

    // soft delete

    // if (!this.isFirebaseStorageFile()) {
    //   this.url = null;
    //   this.urlChanged.emit(this.url);
    //   return;
    // }

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
}
