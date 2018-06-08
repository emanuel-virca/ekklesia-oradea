import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

import { Resource } from '../resource.model';
import { LoaderService } from '../../shared/loader/loader.service';

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

    constructor(private db: AngularFirestore, private loaderService: LoaderService) { }

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
        this.loaderService.show();

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
                if (items.length < this.pageSize) {
                    this.thereIsMore = false;
                }
                this.loading = false;
                this.loaderService.hide();
            },
            err => { this.loading = false; this.loaderService.hide(); });
    }
}
