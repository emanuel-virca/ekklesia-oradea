import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissionsService } from './services/permissions/permissions.service';
import { AuthenticationService } from './services/authentication/authentication.service';
import { HearthisPlayerService } from './services/hearthis-player/hearthis-player.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    PermissionsService,
    AuthenticationService,
    HearthisPlayerService,
  ]
})
export class CoreModule { }
