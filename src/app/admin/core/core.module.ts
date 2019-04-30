import { NgModule } from '@angular/core';

import { FileService } from './services/file/file.service';
import { AuthorService } from './services/author/author.service';

@NgModule({
  declarations: [],
  imports: [],
  providers: [FileService, AuthorService],
})
export class CoreModule {}
