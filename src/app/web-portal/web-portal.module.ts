import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { WebPortalRoutingModule } from './web-portal-routing.module';
import { WebPortalComponent } from './web-portal.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [WebPortalComponent, ContactComponent],
  imports: [SharedModule, WebPortalRoutingModule],
})
export class WebPortalModule {}
