import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CanLoadAdmin } from './shared/route-guards/can-load-admin.service';

const routes: Routes = [
    {
        path: 'resources',
        loadChildren: './resources/resources.module#ResourcesModule',
    },
    {
        path: 'admin',
        loadChildren: './admin/admin.module#AdminModule',
        canLoad: [CanLoadAdmin],
    },
    {
        path: '',
        redirectTo: '/resources',
        pathMatch: 'full'
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

export const AppRouterModule: ModuleWithProviders = RouterModule.forRoot(routes);
