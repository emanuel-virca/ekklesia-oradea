import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectionsRoutingModule } from './collections-routing.module';
import { LikedResourcesComponent } from './containers/liked-resources/liked-resources.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from '@web-portal/collections/reducers';
import { EffectsModule } from '@ngrx/effects';
import { CollectionEffects } from './effects/collections.effects';
import { SharedModule } from '@web-portal/shared/shared.module';

@NgModule({
  declarations: [LikedResourcesComponent],
  imports: [
    CommonModule,
    SharedModule,
    CollectionsRoutingModule,
    StoreModule.forFeature('collections', reducers),
    EffectsModule.forFeature([CollectionEffects]),
  ],
})
export class CollectionsModule {}
