import { NgModule } from '@angular/core';

import { SearchService } from './services/search/search.service';
import { AuthorService } from './services/author/author.service';

@NgModule({
  declarations: [],
  imports: [],
  providers: [SearchService, AuthorService],
})
export class CoreModule {}
