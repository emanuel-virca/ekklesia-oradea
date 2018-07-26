import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { ResourcesListComponent } from './resources/components/resources-list/resources-list.component';
import { CreateResourceComponent } from './resources/components/create-resource/create-resource.component';
import { EditResourceComponent } from './resources/components/edit-resource/edit-resource.component';

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule,
  ],
  declarations: [
    CreateResourceComponent,
    ResourcesListComponent,
    EditResourceComponent,
  ]
})
export class AdminModule { }
