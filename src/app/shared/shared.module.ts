import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContentLoaderModule } from '@netbasal/content-loader';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

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
import { MaterialCardHeaderContentLoaderComponent } from './components/material-card-header-content-loader/material-card-header-content-loader.component';
import { MaterialListContentLoaderComponent } from './components/material-list-content-loader/material-list-content-loader.component';
import { SecondsToTimePipe } from './pipes/seconds-to-time/seconds-to-time.pipe';
import { NavBottomComponent } from './components/nav-bottom/nav-bottom.component';
import { AudioPlayerShellComponent } from './containers/audio-player-shell/audio-player-shell.component';
import { audioPlayerReducer } from './stores/audio-player-store/audio-player.reducer';
import { AudioPlayButtonComponent } from './components/audio-play-button/audio-play-button.component';
import { AudioPlayButtonShellComponent } from './containers/audio-play-button-shell/audio-play-button-shell.component';
import { ConvertToAudioResourcePipe } from './pipes/convert-to-audio-resource/convert-to-audio-resource.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        RouterModule,
        HttpClientModule,
        ContentLoaderModule,
        StoreModule.forFeature('audioPlayer', audioPlayerReducer),
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
        MaterialCardHeaderContentLoaderComponent,
        MaterialListContentLoaderComponent,
        SecondsToTimePipe,
        NavBottomComponent,
        AudioPlayerShellComponent,
        AudioPlayButtonComponent,
        AudioPlayButtonShellComponent,
        ConvertToAudioResourcePipe,
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
        NavBottomComponent,
        ContentLoaderModule,
        MaterialCardHeaderContentLoaderComponent,
        MaterialListContentLoaderComponent,
        AudioPlayButtonShellComponent,
        ConvertToAudioResourcePipe
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
