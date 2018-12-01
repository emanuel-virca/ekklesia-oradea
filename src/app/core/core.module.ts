import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorizationService } from './services/permissions/authorization.service';
import { AuthenticationService } from './services/authentication/authentication.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    AuthorizationService,
    AuthenticationService,
  ]
})
export class CoreModule { }
