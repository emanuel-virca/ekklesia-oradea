import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateResourceComponent } from './resources/create-resource/create-resource.component';

const routes: Routes = [
  { path: 'create-resource', component: CreateResourceComponent },
  { path: '', pathMatch: 'full', redirectTo: 'create-resource' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
