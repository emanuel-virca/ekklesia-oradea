import { NgModule } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxMasonryModule } from 'ngx-masonry';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';
import { ResourcesRoutingModule } from './resources-routing.module';
import { ResourcesListComponent } from './containers/resources-list/resources-list.component';
import { ResourceCardComponent } from './components/resource-card/resource-card.component';
import { ResourcesSearchResultsComponent } from './containers/resources-search-results/resources-search-results.component';
import { ResourceDetailsComponent } from './components/resource-details/resource-details.component';
import { ResourceDetailsShellComponent } from './containers/resource-details-shell/resource-details-shell.component';
import { ResourcesMasonryComponent } from './components/resources-masonry/resources-masonry.component';
import { ResourceTagsComponent } from './components/resource-tags/resource-tags.component';
import { ResourceService } from './services/resource/resource.service';

// NgRx
import { reducers } from './reducers';
import { ResourceEffects } from './effects/resource.effects';
import { ResourcesEffects } from './effects/resources.effects';
import { CollectionEffects } from './effects/collections.effects';
import { CollectionsService } from './services/collections/collections.service';
import { LikedResourcesComponent } from './containers/liked-resources/liked-resources.component';

@NgModule({
  imports: [
    ResourcesRoutingModule,
    InfiniteScrollModule,
    NgxMasonryModule,
    SharedModule,
    StoreModule.forFeature('resources', reducers),
    EffectsModule.forFeature([ResourceEffects, ResourcesEffects, CollectionEffects]),
  ],
  declarations: [
    ResourcesListComponent,
    ResourceCardComponent,
    ResourcesSearchResultsComponent,
    ResourceDetailsComponent,
    ResourceDetailsShellComponent,
    ResourcesMasonryComponent,
    ResourceTagsComponent,
    LikedResourcesComponent,
  ],
  exports: [],
  providers: [ResourceService, CollectionsService],
})
export class ResourcesModule {}
