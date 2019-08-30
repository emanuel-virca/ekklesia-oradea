import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '@web-portal/shared/shared.module';
import { LikedResourcesComponent } from './containers/liked-resources/liked-resources.component';

const routes: Routes = [
  {
    path: 'liked',
    component: LikedResourcesComponent,
  },
  { path: '', pathMatch: 'full', redirectTo: 'liked' },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectionsRoutingModule {}
