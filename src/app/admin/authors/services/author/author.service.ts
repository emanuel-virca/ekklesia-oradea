import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

import { Author } from 'src/app/shared/models/author.model';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { mapItemWithId, mapArrayWithId } from 'src/app/shared/rxjs/pipes';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private itemsCollection: AngularFirestoreCollection<Author>;

  constructor(private db: AngularFirestore, private loaderService: LoaderService) {
    this.itemsCollection = this.db.collection<Author>('authors');
  }

  public get(resourceId: string): Observable<Author> {
    return this.itemsCollection.doc<Author>(resourceId).snapshotChanges().pipe(mapItemWithId);
  }

  public query(): Observable<Author[]> {
    return this.db.collection<Author>('authors').snapshotChanges().pipe(mapArrayWithId);
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

  public async deleteAsync(authorId: string): Promise<void> {
    await this.itemsCollection.doc(authorId).delete();
  }
}
