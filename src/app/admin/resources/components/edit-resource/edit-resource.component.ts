import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { DocumentReference } from '@angular/fire/firestore';

import { ResourceBaseComponent } from '../resource-base.component';
import { AuthorService } from '../../../../shared/services/author/author.service';
import { Resource } from '../../../../shared/models/resource.model';
import { ResourceService } from '../../services/resource/resource.service';


@Component({
  selector: 'app-edit-resource',
  templateUrl: './edit-resource.component.html',
  styleUrls: ['./edit-resource.component.scss']
})
export class EditResourceComponent extends ResourceBaseComponent implements OnInit {
  resource: Resource;

  constructor(
    authorService: AuthorService,
    private resourceService: ResourceService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    super(authorService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.route.paramMap.subscribe((params: ParamMap) => this.getResource(params.get('id')));
  }

  getResource(id) {
    this.resourceService.get(id).subscribe((resource: Resource) => {
      this.resource = resource;
      this.resourceForm.controls.title.setValue(resource.title);
      this.resourceForm.controls.dateTime.setValue(resource.dateTime.toDate());
      this.resourceForm.controls.description.setValue(resource.description);
      this.resourceForm.controls.hearthisId.setValue(resource.hearthisId);
      this.resourceForm.controls.imageSrc.setValue(resource.imageSrc);
      this.resourceForm.controls.resourceType.setValue(resource.type);
      this.resourceForm.controls.author.setValue(resource.author);
    });
  }

  compareWith(o1: DocumentReference, o2: DocumentReference) {
    return o1.id === o2.id;
  }

  public async publish() {
    if (!this.resource) { return; }

    await this.resourceService.publishAsync(this.resource.id);
  }

  public async unpublish() {
    if (!this.resource) { return; }

    await this.resourceService.unpublishAsync(this.resource.id);
  }

  async save() {
    const resource: Resource = {
      id: this.resource.id,
      title: this.resourceForm.controls.title.value,
      type: this.resourceForm.controls.resourceType.value,
      hearthisId: this.resourceForm.controls.hearthisId.value,
      imageSrc: this.resourceForm.controls.imageSrc.value,
      description: this.resourceForm.controls.description.value,
      dateTime: this.resourceForm.controls.dateTime.value,
      author: this.resourceForm.controls.author.value,
      published: this.resource.published,
    };

    if (this.resourceForm.controls.hearthisId.value) {
      resource.downloadUrl = `https://hearthis.at/ekklesia/${this.resourceForm.controls.hearthisId.value}/download`;
      resource.streamUrl = `https://hearthis.at/ekklesia/${this.resourceForm.controls.hearthisId.value}/listen`;
    }

    try {
      await this.resourceService.updateAsync(resource);

      // TODO create notification service
      this.snackBar.open('Data sucessfully saved', null, { duration: 5000, });

      this.resetForm();

    } catch (e) {
      this.snackBar.open('An error occured while savind data!', null, { duration: 5000, });
    }

  }

}
