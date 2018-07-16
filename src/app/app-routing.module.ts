import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
    {
        path: 'resources',
        loadChildren: './resources/resources.module#ResourcesModule',
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
