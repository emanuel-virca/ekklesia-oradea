import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FirebaseUISignInSuccessWithAuthResult, FirebaseUISignInFailure } from 'firebaseui-angular';

import { AuthenticationService } from '@authentication/services/authentication/authentication.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginDialogComponent {
  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>, private authService: AuthenticationService) {}

  async successCallback(data: FirebaseUISignInSuccessWithAuthResult) {
    await this.authService.updateUserDataWithCredentials(data.authResult);
    this.dialogRef.close(data);
  }

  async errorCallback(data: FirebaseUISignInFailure) {
    if (data.code === 'firebaseui/anonymous-upgrade-merge-conflict') {
      await this.authService.mergeConflictsAsync(data);
      this.dialogRef.close(data);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
