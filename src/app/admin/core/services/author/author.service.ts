import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Author } from '@shared/models/author';
import { LoaderService } from '@core/services/loader/loader.service';
import { mapItemWithId, mapArrayWithId } from '@core/rxjs/pipes';

@Injectable()
export class AuthorService {
  private itemsCollection: AngularFirestoreCollection<Author>;

  constructor(private db: AngularFirestore, private loaderService: LoaderService) {
    this.itemsCollection = this.db.collection<Author>('authors');
  }

  public list(): Observable<Author[]> {
    return this.itemsCollection.snapshotChanges().pipe(mapArrayWithId);
  }

  public get(resourceId: string): Observable<Author> {
    return this.itemsCollection
      .doc<Author>(resourceId)
      .snapshotChanges()
      .pipe(mapItemWithId);
  }

  public async createAsync(author: Author): Promise<Author> {
    this.loaderService.show();

    try {
      await this.itemsCollection.add(author);
    } catch (e) {
      console.log(e);
    }

    this.loaderService.hide();

    return author;
  }

  public async updateAsync(author: Author): Promise<void> {
    await this.itemsCollection.doc(author.id).update(author);
  }

  public async deleteAsync(authorId: string): Promise<void> {
    await this.itemsCollection.doc(authorId).delete();
  }
}
