import { Component, OnInit, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { Resource } from '../../shared/models/resource.model';
import { LoaderService } from '../../core/services/loader/loader.service';
import { ResourceService } from '../../shared/services/resource/resource.service';

@Component({
    selector: 'app-resources-list',
    templateUrl: './resources-list.component.html',
    styleUrls: ['./resources-list.component.scss']
})
export class ResourcesListComponent implements OnInit, AfterViewInit {

    @ViewChild('masonryItemSizer') masonryItemSizer: ElementRef;

    resources: Resource[] = new Array<Resource>();
    lastVisible: Resource;
    pageSize = 20;
    loading = false;
    thereIsMore = true;
    cardWidth: number;
    viewInitalized = false;

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.cardWidth = this.getMasonryItemSize();
    }

    constructor(
        private resourceService: ResourceService,
        private loaderService: LoaderService,
    ) {

    }

    ngOnInit() {
        this.getNextResources();
    }

    ngAfterViewInit() {
        this.cardWidth = this.getMasonryItemSize();
        setTimeout(() => this.viewInitalized = true);
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

    private getMasonryItemSize(): number {
        if (!this.masonryItemSizer) { return 0; }
        return this.masonryItemSizer.nativeElement.getBoundingClientRect().width;
    }
}
