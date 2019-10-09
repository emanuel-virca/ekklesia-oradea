import {
  Component,
  Input,
  SimpleChanges,
  OnChanges,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatChipInputEvent } from '@angular/material';
import { Observable } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { Resource, ResourceType } from '@shared/models/resource';
import { Tag } from '@shared/models/tag';
import { Author, AuthorSnippet, convertToAuthorSnippet } from '@shared/models/author';
import { AuthorService } from '@admin/core/services/author/author.service';
import { ListItemBaseComponent } from '@admin/shared/helpers/list-item-base.component';
import { SelectOption } from '@admin/shared/models/select-option';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceComponent extends ListItemBaseComponent<Resource> implements OnChanges {
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  readonly resourceTypes: Array<SelectOption> = [
    { text: 'Audio', value: ResourceType.Audio },
    { text: 'Video', value: ResourceType.Video },
    { text: 'Article', value: ResourceType.Article },
  ];
  authors$: Observable<AuthorSnippet[]>;
  @Input() resource: Resource;
  @Output() publish = new EventEmitter();
  @Output() unpublish = new EventEmitter();

  resourceForm = new FormGroup({
    title: new FormControl(),
    dateTime: new FormControl(),
    description: new FormControl(),
    hearthisId: new FormControl(),
    type: new FormControl(),
    author: new FormControl(),
  });

  imageUploadFolder = '/resources';

  constructor(public dialog: MatDialog, private authorService: AuthorService) {
    super(dialog, { messageFn: (resource: Resource) => `You are about to delete <b>${resource.title}</b>` });
    this.getAuthors();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.resource) {
      const resource: any = changes.resource.currentValue as Resource;
      this.displayResource(resource);
    }
  }

  getAuthors() {
    this.authors$ = this.authorService.list().pipe(
      map(authors => {
        return authors.map<AuthorSnippet>(x => convertToAuthorSnippet(x));
      })
    );
  }

  displayResource(resource: Resource | null): void {
    // Set the local product property
    // TODO is this necessary???
    this.resource = resource;

    if (this.resource && this.resourceForm) {
      // Reset the form back to pristine
      this.resourceForm.reset();

      // Update the data on the form
      this.resourceForm.patchValue({
        title: resource.title,
        dateTime: resource.dateTime ? resource.dateTime.toDate() : null,
        description: resource.description,
        hearthisId: resource.hearthisId,
        type: resource.type,
        author: resource.author,
      });
    }
  }

  publishResource() {
    if (!this.resource.id) {
      return;
    }

    this.publish.emit(this.resource.id);
  }

  unpublishResource() {
    if (!this.resource.id) {
      return;
    }

    this.unpublish.emit(this.resource.id);
  }

  imageChanged(url: string) {
    this.resource.image = { url };
    this.resourceForm.markAsDirty();
  }

  save() {
    if (!this.resourceForm.valid) {
      return;
    }

    // Copy over all of the original author properties
    // Then copy over the values from the form
    // This ensures values not on the form, such as the Id, are retained
    const resource: Resource = {
      ...this.resource,
      ...this.resourceForm.value,
    };

    if (this.resourceForm.controls.hearthisId.value) {
      resource.downloadUrl = `https://hearthis.at/ekklesia/${this.resourceForm.controls.hearthisId.value}/download`;
      resource.streamUrl = `https://hearthis.at/ekklesia/${this.resourceForm.controls.hearthisId.value}/listen`;
    }

    if (!resource.id) {
      this.createItem(resource);
    } else {
      this.updateItem(resource);
    }
  }

  compareAuthors(a1: Author, a2: Author) {
    return a1.id === a2.id;
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if (!this.resource.tags) {
      this.resource.tags = [];
    }

    // Add tag
    if ((value || '').trim()) {
      this.resource.tags.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.resourceForm.markAsDirty();
  }

  removeTag(tag: Tag): void {
    const index = this.resource.tags.indexOf(tag);

    if (index >= 0) {
      this.resource.tags.splice(index, 1);
      this.resourceForm.markAsDirty();
    }
  }

  get title() {
    return this.resourceForm.controls.title;
  }
  get dateTime() {
    return this.resourceForm.controls.dateTime;
  }
  get author() {
    return this.resourceForm.controls.author;
  }
  get type() {
    return this.resourceForm.controls.type;
  }
}
