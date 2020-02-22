import { NgModule } from '@angular/core';

import { UserMostRecentHistoryComponent } from './containers/user-most-recent-history/user-most-recent-history.component';
import { SharedModule } from '@web-portal/shared/shared.module';

@NgModule({
  declarations: [UserMostRecentHistoryComponent],
  imports: [SharedModule],
  exports: [UserMostRecentHistoryComponent],
})
export class UserModule {}
