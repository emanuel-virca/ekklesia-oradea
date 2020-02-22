import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ResourcesService } from '@web-portal/core/services/resources/resources.service';

@Component({
  selector: 'app-resources-most-recent',
  templateUrl: './resources-most-recent.component.html',
  styleUrls: ['./resources-most-recent.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourcesMostRecentComponent implements OnInit {
  mostRecentResources$;

  constructor(private resourcesService: ResourcesService) {
    this.mostRecentResources$ = this.resourcesService.getMostRecent();
  }

  ngOnInit() {}
}
