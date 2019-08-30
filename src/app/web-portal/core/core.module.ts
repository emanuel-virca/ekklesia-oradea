import { NgModule } from '@angular/core';

import { SearchService } from './services/search/search.service';
import { AuthorService } from './services/author/author.service';
import { ResourcesService } from './services/resources/resources.service';
import { CollectionsService } from './services/collections/collections.service';

@NgModule({
  declarations: [],
  imports: [],
  providers: [SearchService, AuthorService, ResourcesService, CollectionsService],
})
export class CoreModule {}
