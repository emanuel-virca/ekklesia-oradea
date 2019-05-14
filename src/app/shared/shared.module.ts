import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoaderComponent } from './components/loader/loader.component';
import { DocPipe } from './pipes/doc/doc.pipe';
import { MaterialModule } from './material/material.module';
import { AppShellNoRenderDirective } from './directives/app-shell-no-render.directive';
import { AppShellRenderDirective } from './directives/app-shell-render.directive';

@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  declarations: [LoaderComponent, DocPipe, AppShellNoRenderDirective, AppShellRenderDirective],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    LoaderComponent,
    DocPipe,
    AppShellNoRenderDirective,
    AppShellRenderDirective,
  ],
  providers: [],
  entryComponents: [],
})
export class SharedModule {}
