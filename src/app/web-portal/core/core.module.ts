import { NgModule } from '@angular/core';

import { SearchService } from './services/search/search.service';
import { AuthorService } from './services/author/author.service';
import { SeoService } from './services/seo/seo.service';

@NgModule({
  declarations: [],
  imports: [],
  providers: [SearchService, AuthorService, SeoService],
})
export class CoreModule {}
