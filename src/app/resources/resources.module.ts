import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatIconModule, MatAutocompleteModule, MatInputModule, MatFormFieldModule, MatListModule } from '@angular/material';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxMasonryModule } from 'ngx-masonry';

import { ResourcesRoutingModule } from './resources-routing.module';
import { ResourcesListComponent } from './resources-list/resources-list.component';
import { ResourceCardComponent } from './resource-card/resource-card.component';
import { ResourcesSearchComponent } from './resources-search/resources-search.component';
import { ResourcesSearchResultsComponent } from './resources-search-results/resources-search-results.component';

@NgModule({
    imports: [
        CommonModule,
        ResourcesRoutingModule,
        InfiniteScrollModule,
        NgxMasonryModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatListModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [
        ResourcesListComponent,
        ResourceCardComponent,
        ResourcesSearchComponent,
        ResourcesSearchResultsComponent,
    ],
    exports: [],
    providers: []
})
export class ResourcesModule { }
