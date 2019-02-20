import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  HostListener,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'app-resources-masonry',
  templateUrl: './resources-masonry.component.html',
  styleUrls: ['./resources-masonry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourcesMasonryComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('masonryItemSizer') masonryItemSizer: ElementRef;
  @Input() resources: any[];
  masonryColumnWidth: number;
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
  masonryGutter = 15;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.computeMasonryGutterSize();
    this.computeMasonry();
    setTimeout(() => (this.updateMasonryLayout = !this.updateMasonryLayout), 100);
  }

  constructor(private media: MediaObserver) {}

  ngOnInit() {
    this.computeMasonryGutterSize();
    this.masonryStyleElement = this.createMasonryStyleTag();
  }

  ngAfterViewInit() {
    this.computeMasonry();

    setTimeout(() => (this.viewInitalized = true), 100);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.resources = changes.resources.currentValue || [];
  }

  private computeMasonryGutterSize() {
    if (this.media.isActive('xs') || this.media.isActive('sm')) {
      this.masonryGutter = 15;
    } else {
      this.masonryGutter = 25;
    }
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
            margin-bottom: ${this.masonryGutter}px
        }

        .gutter-sizer {
            width: ${this.masonryGutter}px;
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
