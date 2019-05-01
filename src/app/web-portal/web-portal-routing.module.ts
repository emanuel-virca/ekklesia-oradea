import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WebPortalComponent } from './web-portal.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  {
    path: '',
    component: WebPortalComponent,
    children: [
      { path: 'contact', component: ContactComponent },
      { path: 'resources', loadChildren: '@web-portal/resources/resources.module#ResourcesModule' },
      { path: '', pathMatch: 'full', redirectTo: 'resources' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebPortalRoutingModule {}