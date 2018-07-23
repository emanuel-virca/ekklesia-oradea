import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LoaderService } from '../../../core/services/loader/loader.service';
import { Author } from '../../models/author.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private itemsCollection: AngularFirestoreCollection<Author>;

  constructor(private db: AngularFirestore, private loaderService: LoaderService) {
    this.itemsCollection = this.db.collection<Author>('authors');
  }

  list(): Observable<Author[]> {
    return this.itemsCollection.valueChanges();
  }

  listWithRef(): Observable<Author[]> {
    return this.itemsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map((a: any) => {
          const data = a.payload.doc.data();
          const ref = a.payload.doc.ref;
          return { ref, ...data };
        });
      })
    );
  }

  get(documentId: string) {
    return this.itemsCollection.doc(documentId);
  }
}
