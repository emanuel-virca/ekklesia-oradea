import { NgModule } from '@angular/core';

import { AuthorizationService } from './services/authorization/authorization.service';
import { AuthenticationService } from './services/authentication/authentication.service';
import { MessagingService } from './services/messaging/messaging.service';
import { NotificationTokenService } from './services/notification-token/notification-token.service';
import { CanLoadAdminGuard } from './route-guards/can-load-admin.guard';
import { UserService } from './services/user/user.service';

@NgModule({
  imports: [],
  declarations: [],
  providers: [
    AuthorizationService,
    AuthenticationService,
    NotificationTokenService,
    MessagingService,
    CanLoadAdminGuard,
    UserService,
  ],
})
export class CoreModule {}
