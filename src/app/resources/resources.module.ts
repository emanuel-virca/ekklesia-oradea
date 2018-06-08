import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule, MatIconModule } from '@angular/material';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { ResourcesRoutingModule } from './resources-routing.module';
import { ResourcesListComponent } from './resources-list/resources-list.component';
import { ResourceCardComponent } from './resource-card/resource-card.component';

@NgModule({
    imports: [
        CommonModule,
        ResourcesRoutingModule,
        InfiniteScrollModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
    ],
    declarations: [
        ResourcesListComponent,
        ResourceCardComponent,
    ],
    exports: [],
    providers: []
})
export class ResourcesModule { }
