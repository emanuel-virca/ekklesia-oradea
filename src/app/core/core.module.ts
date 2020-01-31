import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AuthorizationService } from './services/authorization/authorization.service';
import { MessagingService } from './services/messaging/messaging.service';
import { CanLoadAdminGuard } from './route-guards/can-load-admin.guard';
import { UserService } from './services/user/user.service';
import { NotificationsService } from './services/notifications/notifications.service';
import { AuthenticationModule } from '@authentication/authentication.module';
import { AppInitializerService } from './services/app-initializer/app-initializer.service';

@NgModule({
  imports: [HttpClientModule, AuthenticationModule],
  declarations: [],
  providers: [
    AuthorizationService,
    MessagingService,
    CanLoadAdminGuard,
    UserService,
    NotificationsService,
    AppInitializerService,
  ],
})
export class CoreModule {}
