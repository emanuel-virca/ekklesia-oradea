import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';

import { FileService } from '../../../core/services/file/file.service';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.css']
})
export class ImageUploaderComponent implements OnInit {
  uploading = false;

  @Output() urlChanged = new EventEmitter<string>();

  @Input() url: string;
  @Input() folder = 'common';

  constructor(
    private afStorage: AngularFireStorage,
    private fileService: FileService,
  ) { }

  ngOnInit() {
  }

  public async deleteAsync() {
    if (!this.url) { return; }

    try {
      const fileRef = this.afStorage.storage.refFromURL(this.url);
      await fileRef.delete();
      this.url = null;
      this.urlChanged.emit(this.url);
    } catch (ex) {
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
      console.log(ex);
    } finally {
      this.uploading = false;
    }

  }
}
