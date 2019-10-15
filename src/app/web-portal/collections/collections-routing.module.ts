import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '@web-portal/shared/shared.module';
import { LikedResourcesComponent } from './containers/liked-resources/liked-resources.component';
import { likesLibraryId } from '@shared/models/library';

const routes: Routes = [
  {
    path: likesLibraryId,
    component: LikedResourcesComponent,
  },
  { path: '', pathMatch: 'full', redirectTo: likesLibraryId },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectionsRoutingModule {}
