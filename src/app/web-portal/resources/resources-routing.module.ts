import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ResourcesListComponent } from './containers/resources-list/resources-list.component';
import { ResourcesSearchResultsComponent } from './containers/resources-search-results/resources-search-results.component';
import { ResourceDetailsShellComponent } from './containers/resource-details-shell/resource-details-shell.component';
import { LikedResourcesComponent } from './containers/liked-resources/liked-resources.component';

const routes: Routes = [
  { path: 'results', component: ResourcesSearchResultsComponent },
  { path: 'collections/liked-resources', component: LikedResourcesComponent },
  { path: ':id', component: ResourceDetailsShellComponent },
  { path: '', pathMatch: 'full', component: ResourcesListComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [],
})
export class ResourcesRoutingModule {}
