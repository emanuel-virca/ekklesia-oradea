import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoaderComponent } from './components/loader/loader.component';
import { DocPipe } from './pipes/doc/doc.pipe';
import { MaterialModule } from './material/material.module';

@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  declarations: [LoaderComponent, DocPipe],
  exports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, MaterialModule, LoaderComponent, DocPipe],
  providers: [],
  entryComponents: [],
})
export class SharedModule {}
