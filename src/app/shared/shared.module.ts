import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContentLoaderModule } from '@netbasal/content-loader';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LoaderComponent } from './components/loader/loader.component';
import { CanLoadAdminGuard } from '../core/route-guards/can-load-admin.guard';
import { DocPipe } from './pipes/doc/doc.pipe';
import { SecondsToTimePipe } from './pipes/seconds-to-time/seconds-to-time.pipe';
import { ConvertToAudioResourcePipe } from '../web-portal/shared/pipes/convert-to-audio-resource/convert-to-audio-resource.pipe';
import { MaterialModule } from './material/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    ContentLoaderModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  declarations: [LoaderComponent, DocPipe, SecondsToTimePipe, ConvertToAudioResourcePipe],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    LoaderComponent,
    DocPipe,
    ContentLoaderModule,
    SecondsToTimePipe,
    ConvertToAudioResourcePipe,
  ],
  providers: [CanLoadAdminGuard],
  entryComponents: [],
})
export class SharedModule {}
