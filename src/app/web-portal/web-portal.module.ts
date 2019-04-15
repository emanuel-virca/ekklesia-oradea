import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebPortalRoutingModule } from './web-portal-routing.module';
import { WebPortalComponent } from './web-portal.component';

@NgModule({
  declarations: [WebPortalComponent],
  imports: [CommonModule, WebPortalRoutingModule],
  bootstrap: [WebPortalComponent],
})
export class WebPortalModule {}
