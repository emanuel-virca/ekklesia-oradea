import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

import { Resource } from '../resource.model';

@Component({
    selector: 'app-resources-list',
    templateUrl: './resources-list.component.html',
    styleUrls: ['./resources-list.component.css']
})
export class ResourcesListComponent implements OnInit {

    resources: Resource[] = new Array<Resource>();
    lastVisible: Resource;
    pageSize = 10;
    loading = false;
    thereIsMore = true;

    constructor(private db: AngularFirestore) { }

    ngOnInit() {
        this.getNextResources();
    }

    onScroll() {
        if (!this.loading && this.thereIsMore) {
            this.getNextResources();
        }
    }

    private getNextResources() {
        this.loading = true;

        const queryRef = this.db.collection<Resource>('resources', ref => {
            if (this.lastVisible) {
                return ref.orderBy('dateTime', 'desc').startAfter(this.lastVisible.dateTime).limit(this.pageSize);
            } else {
                return ref.orderBy('dateTime', 'desc').limit(this.pageSize);
            }
        }).valueChanges().subscribe(
            (items: Resource[]) => {
                this.resources = this.resources.concat(items);
                this.lastVisible = items[items.length - 1];
                this.loading = false;
                if (items.length < this.pageSize) {
                    this.thereIsMore = false;
                }
            },
            err => this.loading = false);
    }
}
