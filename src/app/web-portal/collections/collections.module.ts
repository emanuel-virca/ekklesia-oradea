import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CollectionsRoutingModule } from './collections-routing.module';
import { LikedResourcesComponent } from './containers/liked-resources/liked-resources.component';
import { reducers, featureKey } from './reducers';
import { CollectionEffects } from './effects/collections.effects';
import { SharedModule } from '@web-portal/shared/shared.module';
import { CollectionsFacade } from './facades/collections.facade';
import { CollectionsComponent } from './collections.component';

@NgModule({
  declarations: [LikedResourcesComponent, CollectionsComponent],
  imports: [
    CommonModule,
    SharedModule,
    CollectionsRoutingModule,
    StoreModule.forFeature(featureKey, reducers),
    EffectsModule.forFeature([CollectionEffects]),
  ],
  providers: [CollectionsFacade],
})
export class CollectionsModule {}
