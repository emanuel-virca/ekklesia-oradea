import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { ResourceBaseComponent } from '../resource-base.component';
import { AuthorService } from '../../../../shared/services/author/author.service';
import { ResourceService } from '../../../../shared/services/resource/resource.service';
import { Resource } from '../../../../shared/models/resource.model';

@Component({
  selector: 'app-create-resource',
  templateUrl: './create-resource.component.html',
  styleUrls: ['./create-resource.component.css']
})
export class CreateResourceComponent extends ResourceBaseComponent implements OnInit {

  constructor(
    authorService: AuthorService,
    private resourceService: ResourceService,
    public snackBar: MatSnackBar,
  ) {
    super(authorService);
  }

  ngOnInit() {
    super.ngOnInit();
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

      // TODO create notification service
      this.snackBar.open('Data sucessfully saved', null, { duration: 5000, });

      this.resetForm();

    } catch (e) {
      this.snackBar.open('An error occured while savind data!', null, { duration: 5000, });
    }
  }
}
