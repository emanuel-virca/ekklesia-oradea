import { OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { AngularFireStorage } from 'angularfire2/storage';

import { ResourceTypeSelect } from '../../../shared/models/resource.model';
import { SelectOption } from '../../../shared/models/select-option';
import { AuthorService } from '../../../shared/services/author/author.service';
import { Author } from '../../../shared/models/author.model';
import { Guid } from '../../../core/typescript-utilities/guid';

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
    imageUploadPercent: Observable<number>;
    imageDownloadURL: Observable<string>;
    showImageLoader = false;

    constructor(
        private authorService: AuthorService,
        private afStorage: AngularFireStorage
    ) { }

    ngOnInit() {
        this.getAuthors();
    }

    getAuthors() {
        this.authors = this.authorService.listWithRef().pipe(map((authors: Author[]) => {
            return authors.map((x) => ({ text: x.firstName + ' ' + x.lastName, value: x.ref }));
        }));
    }

    upload(event) {
        this.showImageLoader = true;

        const file = event.target.files[0];
        const filePath = '/resources/' + Guid.MakeNew().ToString() ;
        const fileRef = this.afStorage.ref(filePath);
        const task = this.afStorage.upload(filePath, file);

        this.imageUploadPercent = task.percentageChanges();

        // get notified when the download URL is available
        task.snapshotChanges().pipe(finalize(() => {
            this.showImageLoader = false;
            fileRef.getDownloadURL().subscribe(downloadUrl => this.resourceForm.controls.imageSrc.setValue(downloadUrl));
        })).subscribe();
    }

    async deleteImage() {
        if (this.imageSrc.value) {
            const fileRef = this.afStorage.storage.refFromURL(this.imageSrc.value);
            await fileRef.delete();
            this.resourceForm.controls.imageSrc.setValue(null);
        }
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
    get imageSrc() { return this.resourceForm.controls.imageSrc; }
}
