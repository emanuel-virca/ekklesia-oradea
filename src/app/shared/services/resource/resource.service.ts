import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { LoaderService } from '../../../core/services/loader/loader.service';
import { Resource } from '../../models/resource.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  itemsCollection: AngularFirestoreCollection<any>;

  constructor(private db: AngularFirestore, private loaderService: LoaderService) {
    this.itemsCollection = this.db.collection<any>('resources');
  }

  async createAsync(resource: Resource) {
    this.loaderService.show();

    try {
      await this.itemsCollection.add(resource);
    } catch (e) {
      console.log(e);
    }

    this.loaderService.hide();
  }

  query(pageSize: number, lastVisible?: Resource, orderBy?: firebase.firestore.OrderByDirection): Observable<Resource[]> {
    return this.db.collection<Resource>('resources', ref => {
      if (lastVisible) {
        if (orderBy) {
          return ref.orderBy('dateTime', orderBy).startAfter(lastVisible.dateTime).limit(pageSize);
        } else {
          return ref.startAfter(lastVisible.dateTime).limit(pageSize);
        }
      } else {
        if (orderBy) {
          return ref.orderBy('dateTime', orderBy).limit(pageSize);
        } else {
          return ref.limit(pageSize);
        }
      }
    }).valueChanges();
  }
}
