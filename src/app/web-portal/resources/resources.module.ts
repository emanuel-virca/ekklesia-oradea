import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';
import { ResourcesRoutingModule } from './resources-routing.module';
import { ResourcesListComponent } from './containers/resources-list/resources-list.component';
import { ResourcesSearchResultsComponent } from './containers/resources-search-results/resources-search-results.component';
import { ResourceDetailsComponent } from './components/resource-details/resource-details.component';
import { ResourceDetailsShellComponent } from './containers/resource-details-shell/resource-details-shell.component';

// NgRx
import { reducers } from './reducers';
import { ResourceDetailsEffects } from './effects/resource-details.effects';
import { ResourcesEffects } from './effects/resources.effects';
import { CollectionsModule } from '@web-portal/collections/collections.module';
import { ResourcesFacade } from './facades/resources.facade';
import { ResourceDetailsFacade } from './facades/resource-details.facade';

@NgModule({
  imports: [
    ResourcesRoutingModule,
    SharedModule,
    CollectionsModule,
    StoreModule.forFeature('resources', reducers),
    EffectsModule.forFeature([ResourceDetailsEffects, ResourcesEffects]),
  ],
  declarations: [
    ResourcesListComponent,
    ResourcesSearchResultsComponent,
    ResourceDetailsComponent,
    ResourceDetailsShellComponent,
  ],
  exports: [],
  providers: [ResourcesFacade, ResourceDetailsFacade],
})
export class ResourcesModule {}
