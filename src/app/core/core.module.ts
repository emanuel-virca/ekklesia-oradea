import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissionsService } from './services/permissions/permissions.service';
import { AuthenticationService } from './services/authentication/authentication.service';
import { AudioPlayerService } from './services/audio-player/audio-player.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    PermissionsService,
    AuthenticationService,
    AudioPlayerService,
  ]
})
export class CoreModule { }
