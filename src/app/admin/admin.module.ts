import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { CreateResourceComponent } from './resources/create-resource/create-resource.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  declarations: [
    CreateResourceComponent,
  ]
})
export class AdminModule { }
