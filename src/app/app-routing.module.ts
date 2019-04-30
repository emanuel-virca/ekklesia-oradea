import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CanLoadAdminGuard } from './core/route-guards/can-load-admin.guard';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    canLoad: [CanLoadAdminGuard],
  },
  {
    path: '',
    loadChildren: './web-portal/web-portal.module#WebPortalModule',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

export const AppRouterModule: ModuleWithProviders = RouterModule.forRoot(routes);
