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
      {
        path: 'resources',
        loadChildren: () => import('@web-portal/resources/resources.module').then(x => x.ResourcesModule),
      },
      {
        path: 'libraries',
        loadChildren: () => import('@web-portal/collections/collections.module').then(x => x.CollectionsModule),
      },
      {
        path: 'account',
        loadChildren: () => import('@account/account.module').then(m => m.AccountModule),
      },
      { path: '', pathMatch: 'full', redirectTo: 'resources' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebPortalRoutingModule {}
