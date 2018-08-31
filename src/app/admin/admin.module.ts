import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminSharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    AdminSharedModule,
    AdminRoutingModule,
  ],
  declarations: [
    AdminComponent
  ],
  providers: [
  ],
})
export class AdminModule { }
