import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthorsListComponent } from './components/authors-list/authors-list.component';
import { CreateAuthorComponent } from './components/create-author/create-author.component';

const routes: Routes = [
  { path: '', component: AuthorsListComponent },
  { path: 'create', component: CreateAuthorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorsRoutingModule { }
