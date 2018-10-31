import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AuthorsRoutingModule } from './authors-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AdminSharedModule } from 'src/app/admin/shared/shared.module';
import { AuthorsListComponent } from './components/authors-list/authors-list.component';
import { CreateAuthorComponent } from './components/create-author/create-author.component';
import { EditAuthorComponent } from './components/edit-author/edit-author.component';

// NgRx
import { authorReducer } from './state/author.reducers';
import { AuthorEffects } from './state/author.effects';

@NgModule({
  imports: [
    SharedModule,
    AdminSharedModule,
    AuthorsRoutingModule,
    StoreModule.forFeature('authors', authorReducer),
    EffectsModule.forFeature([AuthorEffects]),
  ],
  declarations: [
    AuthorsListComponent,
    CreateAuthorComponent,
    EditAuthorComponent,
  ]
})
export class AuthorsModule { }
