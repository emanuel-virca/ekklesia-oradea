import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-mat-card-avatar-content-loader',
  template: `
    <div style="width: 40px; height: 40px;">
      <content-loader height="40" width="40" speed="2">
        <svg:circle cx="20" cy="20" r="20" />
      </content-loader>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatCardAvatarContentLoaderComponent {}
