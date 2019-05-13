import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-mat-card-subtitle-content-loader',
  template: `
    <div style="width: 200px; height: 17px !important;">
      <content-loader height="17" width="200">
        <svg:rect x="0" y="0" width="100%" height="10" />
      </content-loader>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatCardSubtitleContentLoaderComponent {}
