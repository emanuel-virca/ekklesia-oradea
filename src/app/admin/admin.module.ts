import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { CreateResourceComponent } from './resources/create-resource/create-resource.component';
import { ResourcesListComponent } from './resources/components/resources-list/resources-list.component';

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule,
  ],
  declarations: [
    CreateResourceComponent,
    ResourcesListComponent,
  ]
})
export class AdminModule { }
