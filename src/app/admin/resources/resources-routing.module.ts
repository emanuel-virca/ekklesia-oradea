import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResourceShellComponent } from '@admin/resources/containers/resource-shell/resource-shell.component';

const routes: Routes = [{ path: '', pathMatch: 'full', component: ResourceShellComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResourcesRoutingModule {}
