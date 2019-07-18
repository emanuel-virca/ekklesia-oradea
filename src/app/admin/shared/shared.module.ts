import { NgModule } from '@angular/core';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';

import { SharedModule as CoreSharedModule } from '@shared/shared.module';
import { MaterialModule } from './material/material.module';
import { SaveButtonComponent } from './components/save-button/save-button.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';
import { AuthorSignatureComponent } from './components/author-signature/author-signature.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';

@NgModule({
  declarations: [
    SaveButtonComponent,
    ImageUploaderComponent,
    ConfirmDialogComponent,
    AuthorSignatureComponent,
    MainNavComponent,
  ],
  imports: [CoreSharedModule, MaterialModule],
  exports: [
    CoreSharedModule,
    MaterialModule,
    SaveButtonComponent,
    ImageUploaderComponent,
    ConfirmDialogComponent,
    AuthorSignatureComponent,
    MainNavComponent,
  ],
  entryComponents: [ConfirmDialogComponent],
  providers: [{ provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } }],
})
export class SharedModule {}
