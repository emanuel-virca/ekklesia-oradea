import { NgModule } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxMasonryModule } from 'ngx-masonry';

import { SharedModule } from '../shared/shared.module';
import { ResourcesRoutingModule } from './resources-routing.module';
import { ResourcesListComponent } from './resources-list/resources-list.component';
import { ResourceCardComponent } from './resource-card/resource-card.component';
import { ResourcesSearchResultsComponent } from './resources-search-results/resources-search-results.component';

@NgModule({
    imports: [
        ResourcesRoutingModule,
        InfiniteScrollModule,
        NgxMasonryModule,
        SharedModule,
    ],
    declarations: [
        ResourcesListComponent,
        ResourceCardComponent,
        ResourcesSearchResultsComponent,
    ],
    exports: [],
    providers: []
})
export class ResourcesModule { }
