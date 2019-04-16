import { NgModule } from '@angular/core';
import { SharedModule as CoreSharedModule } from '@shared/shared.module';

import { MainNavComponent } from './components/main-nav/main-nav.component';

@NgModule({
  declarations: [MainNavComponent],
  exports: [MainNavComponent],
  imports: [CoreSharedModule],
})
export class SharedModule {}
