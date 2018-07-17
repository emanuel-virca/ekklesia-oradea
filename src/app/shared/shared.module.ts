import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoaderService } from './loader/loader.service';
import { LoaderComponent } from './loader/loader.component';
import { SearchService } from './services/search.service';
import { MainNavComponent } from './main-nav/main-nav.component';
import { ResourcesSearchComponent } from './components/resources-search/resources-search.component';
import { MaterialModule } from '../material/material.module';
import { AuthenticationService } from './services/authentication.service';
import { PermissionsService } from './services/permissions.service';
import { CanLoadAdmin } from './route-guards/can-load-admin.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        RouterModule,
    ],
    declarations: [
        LoaderComponent,
        MainNavComponent,
        ResourcesSearchComponent,
    ],
    exports: [
        MaterialModule,
        LoaderComponent,
        MainNavComponent,
        ResourcesSearchComponent,
    ],
    providers: [
        LoaderService,
        SearchService,
        PermissionsService,
        AuthenticationService,
        CanLoadAdmin,
    ]
})
export class SharedModule { }
