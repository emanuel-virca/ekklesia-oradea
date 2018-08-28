import { NgModule } from '@angular/core';

import { AuthorsRoutingModule } from './authors-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AdminSharedModule } from 'src/app/admin/shared/shared.module';
import { AuthorsListComponent } from './components/authors-list/authors-list.component';
import { CreateAuthorComponent } from './components/create-author/create-author.component';

@NgModule({
  imports: [
    SharedModule,
    AdminSharedModule,
    AuthorsRoutingModule
  ],
  declarations: [
    AuthorsListComponent,
    CreateAuthorComponent,
  ]
})
export class AuthorsModule { }
