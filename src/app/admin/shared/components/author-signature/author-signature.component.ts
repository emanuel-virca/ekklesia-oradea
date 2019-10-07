import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { Author } from '@shared/models/author';

@Component({
  selector: 'app-author-signature',
  templateUrl: './author-signature.component.html',
  styleUrls: ['./author-signature.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorSignatureComponent implements OnInit {
  @Input() author: Author;
  @Input() onlyAvatar: boolean;

  constructor() {}

  ngOnInit() {}
}
