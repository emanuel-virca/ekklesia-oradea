import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class SvgIconsModule {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    // Usage example: <mat-icon svgIcon="arrow-left" mat-list-icon></mat-icon>
    // Note: solid version is most used. If we need to add another weight version,
    // svgIcon name should contain the weight: svgIcon="arrow-left_regular" or svgIcon="arrow-left_light"
  }
}
