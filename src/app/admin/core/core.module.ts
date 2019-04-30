import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileService } from './services/file/file.service';
import { AuthorService } from './services/author/author.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [FileService, AuthorService],
})
export class CoreModule {}
