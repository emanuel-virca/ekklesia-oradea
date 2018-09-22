import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

import { Guid } from '../../typescript-utilities/guid';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    private afStorage: AngularFireStorage,
  ) { }

  public async deleteByUrlAsync(url): Promise<any> {
    if (!url) { return null; }

    const fileRef = this.afStorage.storage.refFromURL(url);

    return await fileRef.delete();
  }

  public async uploadAsync(folder: string, file: any): Promise<string> {
    const filePath = '/' + folder + '/' + Guid.MakeNew().ToString();
    const fileRef = this.afStorage.ref(filePath);

    return await this.afStorage.upload(filePath, file).then(() => {
      return fileRef.getDownloadURL().toPromise();
    });
  }
}
