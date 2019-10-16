import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '@web-portal/shared/shared.module';
import { LikedResourcesComponent } from './containers/liked-resources/liked-resources.component';
import { likesLibraryId } from '@shared/models/library';
import { CollectionsComponent } from './collections.component';

const routes: Routes = [
  {
    path: '',
    component: CollectionsComponent,
    children: [
      {
        path: likesLibraryId,
        component: LikedResourcesComponent,
      },
      {
        path: '**',
        redirectTo: likesLibraryId,
      },
    ],
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectionsRoutingModule {}
