import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { ResourcesListComponent } from './resources/components/resources-list/resources-list.component';
import { CreateResourceComponent } from './resources/components/create-resource/create-resource.component';
import { EditResourceComponent } from './resources/components/edit-resource/edit-resource.component';
import { ResourceSearchService } from './resources/services/resource-search/resource-search.service';
import { ResourceService } from './resources/services/resource/resource.service';

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule,
  ],
  declarations: [
    CreateResourceComponent,
    ResourcesListComponent,
    EditResourceComponent
  ],
  providers: [
    ResourceService,
    ResourceSearchService,
  ]
})
export class AdminModule { }
