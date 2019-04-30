import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxMasonryModule } from 'ngx-masonry';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';
import { ResourcesRoutingModule } from './resources-routing.module';
import { ResourcesListComponent } from './resources-list/resources-list.component';
import { ResourceCardComponent } from './resource-card/resource-card.component';
import { ResourcesSearchResultsComponent } from './resources-search-results/resources-search-results.component';
import { ResourceDetailsComponent } from './resource-details/resource-details.component';
import { ResourceDetailsShellComponent } from './containers/resource-details-shell/resource-details-shell.component';
import { ResourcesMasonryComponent } from './components/resources-masonry/resources-masonry.component';
import { ResourceService } from './services/resource/resource.service';

// NgRx
import { resourceReducer } from './state/resource.reducers';
import { ResourceEffects } from './state/resource.effects';

@NgModule({
  imports: [
    ResourcesRoutingModule,
    InfiniteScrollModule,
    NgxMasonryModule,
    SharedModule,
    StoreModule.forFeature('resources', resourceReducer),
    EffectsModule.forFeature([ResourceEffects]),
    FlexLayoutModule,
  ],
  declarations: [
    ResourcesListComponent,
    ResourceCardComponent,
    ResourcesSearchResultsComponent,
    ResourceDetailsComponent,
    ResourceDetailsShellComponent,
    ResourcesMasonryComponent,
  ],
  exports: [],
  providers: [ResourceService],
})
export class ResourcesModule {
  constructor() {
    console.log('resources...');
  }
}
