import { Component, OnInit, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { Resource } from '../../shared/models/resource.model';
import { LoaderService } from '../../core/services/loader/loader.service';
import { ResourceService } from '../../shared/services/resource/resource.service';

@Component({
  selector: 'app-resources-list',
  templateUrl: './resources-list.component.html',
  styleUrls: ['./resources-list.component.scss'],
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
  updateMasonryLayout = false;
  masonryOptions: any = {
    transitionDuration: '0',
    horizontalOrder: true,
    columnWidth: '.masonry-item-sizer',
    gutter: '.gutter-sizer',
    percentPosition: true,
    itemSelector: '.masonry-item',
    resize: false,
  };
  masonryStyleElement: HTMLStyleElement;
  masonryGutterSize = 24;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.cardWidth = this.getMasonryItemSize();
    this.setStyle();
    setTimeout(() => (this.updateMasonryLayout = !this.updateMasonryLayout), 100);
  }

  constructor(private resourceService: ResourceService, private loaderService: LoaderService) {}

  ngOnInit() {
    this.masonryStyleElement = this.createStyleTag();
    this.getNextResources();
  }

  ngAfterViewInit() {
    this.cardWidth = this.getMasonryItemSize();
    this.setStyle();

    setTimeout(() => (this.viewInitalized = true), 100);
  }

  createStyleTag() {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.setAttribute('id', 'masonry-style');
    return document.head.appendChild(style);
  }

  setStyle() {
    const cssRules = `
        .masonry-item,
        .masonry-item-sizer {
            width:  ${this.cardWidth}px;
            margin-bottom: ${this.masonryGutterSize}px
        }

        .gutter-sizer {
            width: ${this.masonryGutterSize}px;
        }

        .masonry-grid {
            margin: ${this.masonryGutterSize}px;
        }
    `;

    this.masonryStyleElement.innerHTML = cssRules;
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
      err => {
        this.loading = false;
        this.loaderService.hide();
      }
    );
  }

  private getMasonryItemSize(): number {
    if (!this.masonryItemSizer) {
      return 0;
    }
    return this.masonryItemSizer.nativeElement.getBoundingClientRect().width;
  }
}
