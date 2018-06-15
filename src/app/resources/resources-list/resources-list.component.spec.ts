import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { ResourcesListComponent } from './resources-list.component';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { LoaderService } from '../../shared/loader/loader.service';
import { AngularFireModule } from 'angularfire2';

describe('ResourcesListComponent', () => {
    let component: ResourcesListComponent;
    let fixture: ComponentFixture<ResourcesListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ResourcesListComponent],
            schemas: [NO_ERRORS_SCHEMA], providers: [
                { provide: AngularFirestore, useValue: AngularFirestore },
                LoaderService
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ResourcesListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // it('should create', () => {
    //     expect(component).toBeTruthy();
    // });

    const FirestoreStub = {
        //TODO https://github.com/angular/angularfire2/blob/master/src/firestore/collection/collection.spec.ts

        //collection<T>(ref: CollectionReference, queryFn?: QueryFn): AngularFirestoreCollection<T>;
        // collection: (name: string, ref: Function) => ({
        //     doc: (_id: string) => ({
        //         valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
        //         set: (_d: any) => new Promise((resolve, _reject) => resolve()),
        //     }),
        // })
        // collection<T = any> {
        //     readonly ref: CollectionReference;
        //     private readonly query;
        //     private readonly afs;
        //     constructor(ref: CollectionReference, query: Query, afs: AngularFirestore);
        //     stateChanges(events?: DocumentChangeType[]): Observable<DocumentChangeAction<T>[]>;
        //     auditTrail(events?: DocumentChangeType[]): Observable<DocumentChangeAction<T>[]>;
        //     snapshotChanges(events?: DocumentChangeType[]): Observable<DocumentChangeAction<T>[]>;
        //     valueChanges(): Observable<T[]>;
        //     add(data: T): Promise<DocumentReference>;
        //     doc<T>(path: string): AngularFirestoreDocument<T>;
        // }
    };
});
