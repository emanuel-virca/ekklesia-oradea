import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateResourceComponent } from './components/create-resource/create-resource.component';
import { EditResourceComponent } from './components/edit-resource/edit-resource.component';
import { ResourceShellComponent } from './containers/resource-shell/resource-shell.component';

const routes: Routes = [
  { path: 'create', component: CreateResourceComponent },
  { path: ':id', component: EditResourceComponent },
  { path: '', pathMatch: 'full', component: ResourceShellComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourcesRoutingModule { }
