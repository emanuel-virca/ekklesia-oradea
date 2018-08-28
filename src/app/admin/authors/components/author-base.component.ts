import { OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

export class AuthorBaseComponent implements OnInit {
    authorForm = new FormGroup({
        firstName: new FormControl(),
        lastName: new FormControl(),
        description: new FormControl(),
        avatar: new FormControl(),
    });

    imageUploadFolder = '/authors';

    constructor() { }

    ngOnInit() {
    }

    public hardResetForm() {
        this.resetForm();
        this.authorForm.reset();
    }

    public resetForm() {
        this.authorForm.markAsUntouched();
        this.authorForm.markAsPristine();
    }

    public imageSrcChanged($event) {
        this.authorForm.markAsDirty();
        this.authorForm.controls.avatar.setValue($event);
    }

    get firstName() { return this.authorForm.controls.firstName; }
    get lastName() { return this.authorForm.controls.lastName; }
    get avatar() { return this.authorForm.controls.avatar; }
}
