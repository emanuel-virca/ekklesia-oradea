import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ResourcesListComponent } from './resources-list/resources-list.component';
import { ResourcesSearchResultsComponent } from './resources-search-results/resources-search-results.component';
import { ResourceDetailsShellComponent } from './containers/resource-details-shell/resource-details-shell.component';

const routes: Routes = [
    { path: 'results', component: ResourcesSearchResultsComponent },
    { path: ':id', component: ResourceDetailsShellComponent },
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
