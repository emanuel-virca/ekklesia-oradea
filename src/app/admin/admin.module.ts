import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { CreateResourceComponent } from './resources/create-resource/create-resource.component';

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule,
  ],
  declarations: [
    CreateResourceComponent,
  ]
})
export class AdminModule { }
