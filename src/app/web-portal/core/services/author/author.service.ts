import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Author } from '@shared/models/author';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  private itemsCollection: AngularFirestoreCollection<Author>;

  constructor(private db: AngularFirestore) {
    this.itemsCollection = this.db.collection<Author>('authors');
  }

  list(): Observable<Author[]> {
    return this.itemsCollection.valueChanges();
  }

  get(documentId: string): Observable<Author> {
    return this.itemsCollection.doc<Author>(documentId).valueChanges();
  }
}
