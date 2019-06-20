import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';

import { Debounce } from '@core/decorators/debounce';
import { Resource } from '@shared/models/resource.model';

@Component({
  selector: 'app-resources-masonry',
  templateUrl: './resources-masonry.component.html',
  styleUrls: ['./resources-masonry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourcesMasonryComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('masonryItemSizer', { static: true }) masonryItemSizer: ElementRef;
  @Input() resources: Resource[];
  @Input() scrollContainer: string;

  masonryColumnWidth: number;
  viewInitalized = false;
  updateMasonryLayout = false;
  masonryOptions: any = {
    transitionDuration: '0s',
    horizontalOrder: true,
    columnWidth: '.masonry-item-sizer',
    gutter: '.gutter-sizer',
    percentPosition: true,
    itemSelector: '.masonry-item',
    resize: false,
  };
  masonryStyleElement: HTMLStyleElement;
  resizeTimeout = null;

  @HostListener('window:resize', ['$event'])
  @Debounce()
  onResize(event) {
    this.computeMasonry();
    this.updateMasonryLayout = !this.updateMasonryLayout;
    this.changeDetectorRef.detectChanges();
  }

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    (document.querySelector(this.scrollContainer) as HTMLElement).style.overflowY = 'scroll';
    this.masonryStyleElement = this.createMasonryStyleTag();
  }

  ngAfterViewInit() {
    this.computeMasonry();

    setTimeout(() => (this.viewInitalized = true), 100);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.resources) {
      this.resources = changes.resources.currentValue || [];
    }
  }

  ngOnDestroy(): void {
    (document.querySelector(this.scrollContainer) as HTMLElement).style.overflowY = 'auto';
  }

  private computeMasonry() {
    this.masonryColumnWidth = this.getMasonryColumnWidth();
    this.setMasonryStyle();
  }

  private createMasonryStyleTag() {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.setAttribute('id', 'masonry-style');
    return document.head.appendChild(style);
  }

  private setMasonryStyle() {
    const cssRules = `
        .masonry-item,
        .masonry-item-sizer {
            width:  ${this.masonryColumnWidth}px;
        }
    `;

    this.masonryStyleElement.innerHTML = cssRules;
  }

  private getMasonryColumnWidth(): number {
    if (!this.masonryItemSizer) {
      return 0;
    }
    return this.masonryItemSizer.nativeElement.getBoundingClientRect().width;
  }
}
