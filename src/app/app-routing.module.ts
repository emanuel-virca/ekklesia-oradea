import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CanLoadAdminGuard } from './core/route-guards/can-load-admin.guard';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canLoad: [CanLoadAdminGuard],
  },
  {
    path: '',
    loadChildren: () => import('./web-portal/web-portal.module').then(m => m.WebPortalModule),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

export const AppRouterModule: ModuleWithProviders = RouterModule.forRoot(routes);
