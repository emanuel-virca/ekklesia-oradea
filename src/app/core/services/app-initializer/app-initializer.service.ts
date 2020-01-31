import { Injectable } from '@angular/core';

import { AuthenticationService } from '@authentication/services/authentication.service';

@Injectable()
export class AppInitializerService {
  constructor(private authenticationService: AuthenticationService) {}

  async init(): Promise<void> {
    await this.authenticationService.init();
  }
}
