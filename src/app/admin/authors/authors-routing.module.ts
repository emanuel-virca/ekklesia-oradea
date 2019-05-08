import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthorShellComponent } from './containers/author-shell/author-shell.component';

const routes: Routes = [{ path: '', component: AuthorShellComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorsRoutingModule {}
