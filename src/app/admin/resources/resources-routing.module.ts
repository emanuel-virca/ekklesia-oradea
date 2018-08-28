import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateResourceComponent } from './components/create-resource/create-resource.component';
import { EditResourceComponent } from './components/edit-resource/edit-resource.component';
import { ResourcesListComponent } from './components/resources-list/resources-list.component';

const routes: Routes = [
  { path: 'create', component: CreateResourceComponent },
  { path: ':id', component: EditResourceComponent },
  { path: '', pathMatch: 'full', component: ResourcesListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourcesRoutingModule { }
