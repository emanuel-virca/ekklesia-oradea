import { NgModule } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';

import {
  MatButtonModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatTableModule,
} from '@angular/material';

@NgModule({
  exports: [
    CdkTableModule,
    MatButtonModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTableModule,
  ],
})
export class MaterialModule {}
