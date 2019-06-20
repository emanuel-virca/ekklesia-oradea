import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@admin/shared/shared.module';
import { AuthorsRoutingModule } from './authors-routing.module';
import { AuthorsListComponent } from './components/authors-list/authors-list.component';
import { AuthorComponent } from './components/author/author.component';
import { AuthorShellComponent } from './containers/author-shell/author-shell.component';

// NgRx
import { authorReducer } from './state/author.reducers';
import { AuthorEffects } from './state/author.effects';

@NgModule({
  declarations: [AuthorsListComponent, AuthorComponent, AuthorShellComponent],
  imports: [
    SharedModule,
    AuthorsRoutingModule,
    StoreModule.forFeature('admin-authors', authorReducer),
    EffectsModule.forFeature([AuthorEffects]),
  ],
  providers: [],
})
export class AuthorsModule {}
