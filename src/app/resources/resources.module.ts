import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxMasonryModule } from 'ngx-masonry';

import { ResourcesRoutingModule } from './resources-routing.module';
import { ResourcesListComponent } from './resources-list/resources-list.component';
import { ResourceCardComponent } from './resource-card/resource-card.component';
import { ResourcesSearchResultsComponent } from './resources-search-results/resources-search-results.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
    imports: [
        ResourcesRoutingModule,
        InfiniteScrollModule,
        NgxMasonryModule,
        MaterialModule,
        CommonModule
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
