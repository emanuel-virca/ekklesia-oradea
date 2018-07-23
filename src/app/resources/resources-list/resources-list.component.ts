import { Component, OnInit } from '@angular/core';

import { Resource } from '../../shared/models/resource.model';
import { LoaderService } from '../../core/services/loader/loader.service';
import { ResourceService } from '../../shared/services/resource/resource.service';

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

    constructor(private resourceService: ResourceService, private loaderService: LoaderService) { }

    ngOnInit() {
        this.getNextResources();
    }

    onScroll() {
        if (!this.loading && this.thereIsMore) {
            this.getNextResources();
        }
    }

    private getNextResources() {
        // TODO move loader
        this.loading = true;
        this.loaderService.show();

        this.resourceService.query(this.pageSize, this.lastVisible, 'desc').subscribe(
            (items: Resource[]) => {
                this.resources = this.resources.concat(items);
                this.lastVisible = items[items.length - 1];
                if (items.length < this.pageSize) {
                    this.thereIsMore = false;
                }
                this.loading = false;
                this.loaderService.hide();
            },
            err => { this.loading = false; this.loaderService.hide(); }
        );
    }
}
