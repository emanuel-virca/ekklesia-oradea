import { NgModule } from '@angular/core';
import {
  MatProgressBarModule,
  MatDialogModule,
  MatButtonModule,
  MatIconModule,
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material';

@NgModule({
  imports: [MatButtonModule],
  exports: [MatProgressBarModule, MatDialogModule, MatButtonModule, MatIconModule, MatSnackBarModule],
  providers: [{ provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } }],
})
export class MaterialModule {}
