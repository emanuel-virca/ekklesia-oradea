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
  MatTabsModule,
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
    MatTabsModule,
  ],
})
export class MaterialModule {}
