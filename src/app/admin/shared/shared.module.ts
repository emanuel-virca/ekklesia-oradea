import { NgModule } from '@angular/core';

import { SaveButtonComponent } from './components/save-button/save-button.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [SharedModule],
  declarations: [SaveButtonComponent],
  exports: [SaveButtonComponent],
})
export class AdminSharedModule {}
