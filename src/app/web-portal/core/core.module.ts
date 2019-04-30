import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchService } from './services/search/search.service';
import { AuthorService } from './services/author/author.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [SearchService, AuthorService],
})
export class CoreModule {}
