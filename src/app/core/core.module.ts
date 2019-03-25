import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorizationService } from './services/permissions/authorization.service';
import { AuthenticationService } from './services/authentication/authentication.service';
import { MessagingService } from './services/messaging/messaging.service';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [AuthorizationService, AuthenticationService, MessagingService],
})
export class CoreModule {}
