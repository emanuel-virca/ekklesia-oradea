import { NgModule } from '@angular/core';

import { AuthorsRoutingModule } from './authors-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AuthorsListComponent } from './components/authors-list/authors-list.component';

@NgModule({
  imports: [
    SharedModule,
    AuthorsRoutingModule
  ],
  declarations: [AuthorsListComponent]
})
export class AuthorsModule { }
