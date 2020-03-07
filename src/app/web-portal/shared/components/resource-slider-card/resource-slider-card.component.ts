import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ResourceSnippet } from '@shared/models/resource';

@Component({
  selector: 'app-resource-slider-card',
  templateUrl: './resource-slider-card.component.html',
  styleUrls: ['./resource-slider-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceSliderCardComponent {
  @Input() resource: ResourceSnippet;
  @Input() height = 220;
  @Input() width = 220;
}
