import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'resources', loadChildren: 'src/app/admin/resources/resources.module#AdminResourcesModule' },
      { path: 'authors', loadChildren: 'src/app/admin/authors/authors.module#AuthorsModule' },
      { path: '', pathMatch: 'full', redirectTo: 'resources'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
