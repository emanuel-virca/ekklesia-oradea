import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Resource, ResourceTypeSelect } from '../../../shared/models/resource.model';
import { SelectOption } from '../../../shared/models/select-option';
import { Author } from '../../../shared/models/author.model';
import { ResourceService } from '../../../shared/services/resource/resource.service';
import { AuthorService } from '../../../shared/services/author/author.service';


@Component({
  selector: 'app-create-resource',
  templateUrl: './create-resource.component.html',
  styleUrls: ['./create-resource.component.css']
})
export class CreateResourceComponent implements OnInit {

  resourceTypes = ResourceTypeSelect;
  authors: Observable<SelectOption[]>;

  resourceForm = new FormGroup({
    title: new FormControl(),
    dateTime: new FormControl(),
    description: new FormControl(),
    hearthisId: new FormControl(),
    imageSrc: new FormControl(),
    resourceType: new FormControl(),
    author: new FormControl(),
  });

  constructor(
    private resourceService: ResourceService,
    private authorService: AuthorService,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.getAuthors();
  }

  getAuthors() {
    this.authors = this.authorService.listWithRef().pipe(map((authors: Author[]) => {
      return authors.map((x) => ({ text: x.firstName + ' ' + x.lastName, value: x.ref }));
    }));
  }

  async save() {
    const resource: Resource = {
      title: this.resourceForm.controls.title.value,
      type: this.resourceForm.controls.resourceType.value,
      hearthisId: this.resourceForm.controls.hearthisId.value,
      imageSrc: this.resourceForm.controls.imageSrc.value,
      description: this.resourceForm.controls.description.value,
      dateTime: this.resourceForm.controls.dateTime.value,
      author: this.resourceForm.controls.author.value
    };

    try {
      await this.resourceService.createAsync(resource);

      this.snackBar.open('Data sucessfully saved', null, {
        duration: 5000,
      });

      this.resourceForm.markAsUntouched();
      this.resourceForm.markAsPristine();
      this.resourceForm.reset();

    } catch (e) {
      this.snackBar.open('An error occured while savind data!', null, {
        duration: 5000,
      });
    }
  }

  get title() { return this.resourceForm.controls.title; }
  get dateTime() { return this.resourceForm.controls.dateTime; }
  get author() { return this.resourceForm.controls.author; }
  get resourceType() { return this.resourceForm.controls.resourceType; }

}
