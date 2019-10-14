import { NgModule } from '@angular/core';

import { AuthorizationService } from './services/authorization/authorization.service';
import { MessagingService } from './services/messaging/messaging.service';
import { CanLoadAdminGuard } from './route-guards/can-load-admin.guard';
import { UserService } from './services/user/user.service';
import { NotificationsService } from './services/notifications/notifications.service';

@NgModule({
  imports: [],
  declarations: [],
  providers: [AuthorizationService, MessagingService, CanLoadAdminGuard, UserService, NotificationsService],
})
export class CoreModule {}
