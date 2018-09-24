import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContentLoaderModule } from '@netbasal/content-loader';

import { LoaderComponent } from './components/loader/loader.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { ResourcesSearchComponent } from './components/resources-search/resources-search.component';
import { MaterialModule } from '../material/material.module';
import { CanLoadAdmin } from './route-guards/can-load-admin.service';
import { AuthorService } from './services/author/author.service';
import { ResourceService } from './services/resource/resource.service';
import { DocPipe } from './pipes/doc/doc.pipe';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { NavBottomComponent } from './components/nav-bottom/nav-bottom.component';
import { HearthisPlayerComponent } from './components/hearthis-player/hearthis-player.component';
import { MaterialCardHeaderContentLoaderComponent } from './components/material-card-header-content-loader/material-card-header-content-loader.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        RouterModule,
        ContentLoaderModule,
    ],
    declarations: [
        LoaderComponent,
        MainNavComponent,
        ResourcesSearchComponent,
        DocPipe,
        ImageUploaderComponent,
        ConfirmModalComponent,
        NavBottomComponent,
        HearthisPlayerComponent,
        MaterialCardHeaderContentLoaderComponent,
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
        ImageUploaderComponent,
        ConfirmModalComponent,
        NavBottomComponent,
        ContentLoaderModule,
        MaterialCardHeaderContentLoaderComponent,
    ],
    providers: [
        CanLoadAdmin,
        AuthorService,
        ResourceService,
    ],
    entryComponents: [
        ConfirmModalComponent,
    ]
})
export class SharedModule { }
