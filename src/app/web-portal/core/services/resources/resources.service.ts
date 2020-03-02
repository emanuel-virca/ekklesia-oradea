import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import * as firebase from 'firebase/app';

import { mapItemWithId, mapArrayWithId } from '@core/rxjs/pipes';
import { Resource, ResourceSnippet } from '@shared/models/resource';
import { tap, shareReplay } from 'rxjs/operators';

@Injectable()
export class ResourcesService {
  private loadingMostRecent = new BehaviorSubject(true);
  loadingMostRecent$ = this.loadingMostRecent.asObservable();
  mostRecentResources$;

  constructor(private db: AngularFirestore) {}

  public async get(
    pageSize: number,
    startAfter?: any,
    orderBy?: string,
    orderByDirection?: firebase.firestore.OrderByDirection
  ): Promise<ResourceSnippet[]> {
    let query = this.db
      .collection<ResourceSnippet>('resource-snippets')
      .ref.where('published', '==', true)
      .orderBy(orderBy, orderByDirection)
      .limit(pageSize);

    if (startAfter) {
      query = query.startAfter(startAfter);
    }
    try {
      const snapshotChanges = await query.get();

      return this.mapQuerySnapshotToResource(snapshotChanges);
    } catch (error) {
      console.log(error);
    }
  }

  public getById(resourceId: string): Observable<Resource> {
    return this.db
      .collection<Resource>('resources')
      .doc<Resource>(resourceId)
      .snapshotChanges()
      .pipe(mapItemWithId);
  }

  public mapQuerySnapshotToResource(snapshotChanges: firebase.firestore.QuerySnapshot): ResourceSnippet[] {
    return snapshotChanges.docs.map<ResourceSnippet>(x => ({ id: x.id, ...(x.data() as ResourceSnippet) }));
  }

  public getMostRecent() {
    if (this.mostRecentResources$) {
      return this.mostRecentResources$;
    }

    this.mostRecentResources$ = this.db
      .collection<ResourceSnippet>('resource-snippets', ref =>
        ref
          .where('published', '==', true)
          .orderBy('dateTime', 'desc')
          .limit(10)
      )
      .snapshotChanges()
      .pipe(
        mapArrayWithId,
        tap(() => {
          this.loadingMostRecent.next(false);
        }),
        shareReplay()
      );

    return this.mostRecentResources$;
  }
}
