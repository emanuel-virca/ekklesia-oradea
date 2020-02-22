import { NgModule } from '@angular/core';

import { SearchService } from './services/search/search.service';
import { AuthorService } from './services/author/author.service';
import { ResourcesService } from './services/resources/resources.service';
import { CollectionsService } from './services/collections/collections.service';
import { UserHistoryService } from './services/user-history/user-history.service';

@NgModule({
  declarations: [],
  imports: [],
  providers: [SearchService, AuthorService, ResourcesService, CollectionsService, UserHistoryService],
})
export class CoreModule {}
