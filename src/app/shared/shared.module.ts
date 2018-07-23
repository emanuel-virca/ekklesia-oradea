import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoaderComponent } from './components/loader/loader.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { ResourcesSearchComponent } from './components/resources-search/resources-search.component';
import { MaterialModule } from '../material/material.module';
import { CanLoadAdmin } from './route-guards/can-load-admin.service';
import { AuthorService } from './services/author/author.service';
import { ResourceService } from './services/resource/resource.service';
import { DocPipe } from './pipes/doc/doc.pipe';

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
        DocPipe,
    ],
    exports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        LoaderComponent,
        MainNavComponent,
        ResourcesSearchComponent,
        DocPipe,
    ],
    providers: [
        CanLoadAdmin,
        AuthorService,
        ResourceService,
    ]
})
export class SharedModule { }
