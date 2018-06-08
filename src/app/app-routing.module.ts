import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'resources',
        loadChildren: './resources/resources.module#ResourcesModule',
    },
    {
        path: '**',
        redirectTo: 'resources',
        pathMatch: 'full'
    }
];

export const AppRouterModule: ModuleWithProviders = RouterModule.forRoot(routes);
