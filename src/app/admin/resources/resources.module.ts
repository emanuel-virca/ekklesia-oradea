import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { ResourcesRoutingModule } from './resources-routing.module';
import { CreateResourceComponent } from './components/create-resource/create-resource.component';
import { ResourcesListComponent } from './components/resources-list/resources-list.component';
import { EditResourceComponent } from './components/edit-resource/edit-resource.component';
import { ResourceService } from '../../shared/services/resource/resource.service';
import { ResourceSearchService } from './services/resource-search/resource-search.service';
import { AdminSharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    SharedModule,
    AdminSharedModule,
    ResourcesRoutingModule,
  ],
  declarations: [
    CreateResourceComponent,
    ResourcesListComponent,
    EditResourceComponent,
  ],
  providers: [
    ResourceService,
    ResourceSearchService,
  ]
})
export class AdminResourcesModule { }
