import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOidcClientModule } from 'ng-oidc-client';
import { WebStorageStateStore } from 'oidc-client';

import { environment } from '@env/environment';
import { AuthenticationService } from './services/authentication.service';
import { CanActivateAuthGuard } from './guards/can-activate.auth.guard';

export function initializeAuth(authService: AuthenticationService) {
  return (): Promise<void> => {
    return authService.init();
  };
}

export function getStore() {
  return new WebStorageStateStore({ store: window.localStorage });
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgOidcClientModule.forRoot({
      // prettier-ignore
      oidc_config: {
        authority: environment.sts.authority,
        client_id: environment.sts.clientId,
        redirect_uri: `${environment.webPortal.domainURL}oidc-login-redirect-callback.html`,
        scope: 'openid profile email',
        response_type: 'id_token token',
        post_logout_redirect_uri: `${environment.webPortal.domainURL}oidc-logout-redirect-callback.html`,
        silent_redirect_uri: `${environment.webPortal.domainURL}oidc-silent-renew-redirect-callback.html`,
        accessTokenExpiringNotificationTime: 60,
        automaticSilentRenew: true,
        metadata: {
          authorization_endpoint: `${environment.sts.authority}authorize?audience=${environment.sts.apiAudience}`,
          userinfo_endpoint: `${environment.sts.authority}userinfo`,
          issuer: environment.sts.authority,
          jwks_uri: `${environment.sts.authority}.well-known/jwks.json`,
          // tslint:disable-next-line:max-line-length
          end_session_endpoint: `${environment.sts.authority}v2/logout?returnTo=${environment.webPortal.domainURLEncoded + 'oidc-logout-redirect-callback.html'}&client_id=${environment.sts.clientId}`
        },
        userStore: getStore,
      }
    }),
  ],
  providers: [AuthenticationService, CanActivateAuthGuard],
})
export class AuthenticationModule {}
