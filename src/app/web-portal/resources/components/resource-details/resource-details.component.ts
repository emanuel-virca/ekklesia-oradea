import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  HostListener,
  ChangeDetectorRef,
  SimpleChanges,
  OnChanges,
} from '@angular/core';

import { Resource, ResourceType } from '@shared/models/resource';
import { Debounce } from '@core/decorators/debounce';

@Component({
  selector: 'app-resource-details',
  templateUrl: './resource-details.component.html',
  styleUrls: ['./resource-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceDetailsComponent implements AfterViewInit, OnChanges {
  @Input() resource: Resource;

  width: number;
  height: number;
  viewInitalized = false;

  @ViewChild('columnSizer', { static: true }) columnSizer: ElementRef;

  @HostListener('window:resize', ['$event'])
  @Debounce()
  onResize(event) {
    this.computeSizes();

    this.changeDetectorRef.detectChanges();
  }

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.computeSizes();

    setTimeout(() => (this.viewInitalized = true), 100);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.resource.currentValue) {
      this.computeSizes();
    }
  }

  computeSizes() {
    if (!this.resource) {
      return;
    }

    this.width = this.getColumnWidth();

    if (this.resource.type === ResourceType.Video) {
      this.height = this.computeVideoHeight();
    } else {
      this.height = this.computeImageHeight();
    }
  }

  private getColumnWidth(): number {
    if (!this.columnSizer) {
      return 0;
    }

    return this.columnSizer.nativeElement.getBoundingClientRect().width;
  }

  private computeImageHeight() {
    if (!this.resource || !this.resource.cover) {
      return 220;
    }

    return (this.resource.cover.height / this.resource.cover.width) * this.width;
  }

  private computeVideoHeight() {
    if (!this.resource || !this.resource.videoId) {
      return 220;
    }

    return (this.height = (this.width * 552) / 982);
  }
}
