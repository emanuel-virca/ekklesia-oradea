import { NgModule } from '@angular/core';

import { SharedModule as CoreSharedModule } from '@shared/shared.module';
import { SaveButtonComponent } from './components/save-button/save-button.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';
import { MaterialModule } from './material/material.module';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';

@NgModule({
  declarations: [SaveButtonComponent, ImageUploaderComponent, ConfirmModalComponent],
  imports: [CoreSharedModule, MaterialModule],
  exports: [CoreSharedModule, MaterialModule, SaveButtonComponent, ImageUploaderComponent, ConfirmModalComponent],
  entryComponents: [ConfirmModalComponent],
  providers: [{ provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } }],
})
export class SharedModule {}
