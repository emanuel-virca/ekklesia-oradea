import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Author } from '../../models/author.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private itemsCollection: AngularFirestoreCollection<Author>;

  constructor(private db: AngularFirestore) {
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
