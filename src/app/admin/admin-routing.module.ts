import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateResourceComponent } from './resources/components/create-resource/create-resource.component';
import { ResourcesListComponent } from './resources/components/resources-list/resources-list.component';
import { EditResourceComponent } from './resources/components/edit-resource/edit-resource.component';

const routes: Routes = [
  { path: 'create-resource', component: CreateResourceComponent },
  { path: 'edit-resource/:id', component: EditResourceComponent },
  { path: 'list-resources', component: ResourcesListComponent },
  { path: '', pathMatch: 'full', redirectTo: 'create-resource' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
