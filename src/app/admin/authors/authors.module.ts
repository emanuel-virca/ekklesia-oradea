import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@shared/shared.module';
import { AdminSharedModule } from '@admin/shared/shared.module';
import { AuthorsRoutingModule } from './authors-routing.module';
import { AuthorsListComponent } from './components/authors-list/authors-list.component';
import { AuthorComponent } from './components/author/author.component';

// NgRx
import { authorReducer } from './state/author.reducers';
import { AuthorEffects } from './state/author.effects';
import { AuthorShellComponent } from './containers/author-shell/author-shell.component';

@NgModule({
  imports: [
    SharedModule,
    AdminSharedModule,
    AuthorsRoutingModule,
    StoreModule.forFeature('authors', authorReducer),
    EffectsModule.forFeature([AuthorEffects]),
  ],
  declarations: [AuthorsListComponent, AuthorComponent, AuthorShellComponent],
})
export class AuthorsModule {}
