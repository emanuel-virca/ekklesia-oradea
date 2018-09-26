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
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { ResourceBottomViewerComponent } from './components/resource-bottom-viewer/resource-bottom-viewer.component';
import { AudioPlayerComponent } from 'src/app/shared/components/audio-player/audio-player.component';

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
        ImageUploaderComponent,
        ConfirmModalComponent,
        ResourceBottomViewerComponent,
        AudioPlayerComponent,
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
        ResourceBottomViewerComponent,
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
