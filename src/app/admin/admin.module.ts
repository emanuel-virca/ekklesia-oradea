import { NgModule } from '@angular/core';

import { CoreModule } from '@admin/core/core.module';
import { SharedModule as CoreSharedModule } from '@shared/shared.module';
import { SharedModule } from './shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

@NgModule({
  declarations: [AdminComponent],
  imports: [CoreModule, CoreSharedModule, SharedModule, AdminRoutingModule],
  providers: [],
})
export class AdminModule {}
