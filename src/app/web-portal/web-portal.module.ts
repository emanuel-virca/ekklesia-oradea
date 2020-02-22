import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { WebPortalRoutingModule } from './web-portal-routing.module';
import { WebPortalComponent } from './web-portal.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { ResourcesModule } from './resources/resources.module';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [WebPortalComponent, ContactComponent, HomeComponent],
  imports: [CoreModule, SharedModule, WebPortalRoutingModule, ResourcesModule, UserModule],
})
export class WebPortalModule {}
