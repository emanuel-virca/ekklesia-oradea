import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LoaderComponent } from './components/loader/loader.component';
import { DocPipe } from './pipes/doc/doc.pipe';
import { MaterialModule } from './material/material.module';
import { UserInitialsPipe } from './pipes/user-initials/user-initials.pipe';

@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, FlexLayoutModule],
  declarations: [LoaderComponent, DocPipe, UserInitialsPipe],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    LoaderComponent,
    DocPipe,
    UserInitialsPipe,
    FlexLayoutModule,
  ],
  providers: [],
  entryComponents: [],
})
export class SharedModule {}
