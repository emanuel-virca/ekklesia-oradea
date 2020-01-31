import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

import { Guid } from '@admin/core/typescript-utilities/guid';

@Injectable()
export class FileService {
  constructor(private afStorage: AngularFireStorage) {}

  public async deleteByUrlAsync(url): Promise<any> {
    if (!url) {
      return null;
    }

    const fileRef = this.afStorage.storage.refFromURL(url);

    return await fileRef.delete();
  }

  public async uploadAsync(folder: string, file: File): Promise<string> {
    const fileName = Guid.MakeNew().ToString() + '__' + file.name;
    const filePath = '/' + folder + '/' + fileName;

    await this.afStorage.upload(filePath, file);

    return await this.afStorage
      .ref(filePath)
      .getDownloadURL()
      .toPromise();
  }
}
