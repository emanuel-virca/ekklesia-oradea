import { NgModule } from '@angular/core';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatMenuModule,
  MatRippleModule,
  MatSidenavModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
  MatListModule,
  MatInputModule,
} from '@angular/material';

@NgModule({
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatRippleModule,
    MatSidenavModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatInputModule,
  ],
})
export class MaterialModule {}
