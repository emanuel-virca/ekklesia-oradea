import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from 'src/app/shared/shared.module';
import { ResourcesRoutingModule } from './resources-routing.module';
import { ResourcesListComponent } from './components/resources-list/resources-list.component';
import { EditResourceComponent } from './components/edit-resource/edit-resource.component';
import { ResourceService } from '../../shared/services/resource/resource.service';
import { AdminSharedModule } from '../shared/shared.module';
import { ResourceShellComponent } from './containers/resource-shell/resource-shell.component';

// NgRx
import { resourceReducer } from './state/resource.reducers';
import { ResourceEffects } from './state/resource.effects';

@NgModule({
  imports: [
    SharedModule,
    AdminSharedModule,
    ResourcesRoutingModule,
    StoreModule.forFeature('resources', resourceReducer),
    EffectsModule.forFeature([ResourceEffects]),
  ],
  declarations: [
    ResourcesListComponent,
    EditResourceComponent,
    ResourceShellComponent,
  ],
  providers: [
    ResourceService,
  ]
})
export class AdminResourcesModule { }
