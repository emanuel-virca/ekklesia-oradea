import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseUIModule, firebase, firebaseui } from 'firebaseui-angular';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { AuthenticationService } from './services/authentication/authentication.service';
import { SharedModule } from '@shared/shared.module';

const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    {
      // Google provider must be enabled in Firebase Console to support one-tap
      // sign-up.
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // Required to enable this provider in one-tap sign-up.
      authMethod: 'https://accounts.google.com',
      // Required to enable ID token credentials for this provider.
      // This can be obtained from the Credentials page of the Google APIs
      // console.
      clientId: '256344186138-gr6ik7k0srpl33n05bf890hd0vunu27r.apps.googleusercontent.com',
    },
    {
      provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      scopes: ['public_profile', 'email'],
      customParameters: {
        auth_type: 'reauthenticate',
      },
    },
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    // firebase.auth.GithubAuthProvider.PROVIDER_ID,
    // {
    //   requireDisplayName: false,
    //   provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
    // },
    {
      provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      recaptchaParameters: {
        type: 'image', // 'audio'
        size: 'normal', // 'invisible' or 'compact'
        badge: 'bottomleft', // 'bottomright' or 'inline' applies to invisible.
      },
      defaultCountry: 'RO',
    },
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
  ],
  autoUpgradeAnonymousUsers: true,
  credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM,
};

@NgModule({
  declarations: [LoginDialogComponent],
  imports: [CommonModule, FirebaseUIModule.forRoot(firebaseUiAuthConfig), SharedModule],
  exports: [LoginDialogComponent],
  entryComponents: [LoginDialogComponent],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
