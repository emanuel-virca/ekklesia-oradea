import { OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ResourceTypeSelect } from '../../../shared/models/resource.model';
import { SelectOption } from '../../../shared/models/select-option';
import { AuthorService } from '../../../shared/services/author/author.service';
import { Author } from '../../../shared/models/author.model';

export class ResourceBaseComponent implements OnInit {
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
        private authorService: AuthorService,
    ) { }

    ngOnInit() {
        this.getAuthors();
    }

    getAuthors() {
        this.authors = this.authorService.listWithRef().pipe(map((authors: Author[]) => {
            return authors.map((x) => ({ text: x.firstName + ' ' + x.lastName, value: x.ref }));
        }));
    }

    public hardResetForm() {
        this.resetForm();
        this.resourceForm.reset();
    }

    public resetForm() {
        this.resourceForm.markAsUntouched();
        this.resourceForm.markAsPristine();
    }

    get title() { return this.resourceForm.controls.title; }
    get dateTime() { return this.resourceForm.controls.dateTime; }
    get author() { return this.resourceForm.controls.author; }
    get resourceType() { return this.resourceForm.controls.resourceType; }
}
