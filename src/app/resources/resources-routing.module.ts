import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ResourcesListComponent } from './resources-list/resources-list.component';
import { ResourcesSearchResultsComponent } from './resources-search-results/resources-search-results.component';

const routes: Routes = [
    { path: 'results', component: ResourcesSearchResultsComponent},
    { path: '', component: ResourcesListComponent },
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [],
})
export class ResourcesRoutingModule {

}
