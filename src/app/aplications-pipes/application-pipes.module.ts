import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocPipe } from '../shared/pipes/doc/doc.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DocPipe,
  ],
  exports: [
    DocPipe
  ]
})
export class ApplicationPipesModule { }
