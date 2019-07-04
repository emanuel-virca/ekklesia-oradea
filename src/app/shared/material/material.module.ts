import { NgModule } from '@angular/core';
import { MatProgressBarModule, MatDialogModule, MatButtonModule, MatIconModule } from '@angular/material';

@NgModule({
  imports: [MatButtonModule],
  exports: [MatProgressBarModule, MatDialogModule, MatButtonModule, MatIconModule],
})
export class MaterialModule {}
