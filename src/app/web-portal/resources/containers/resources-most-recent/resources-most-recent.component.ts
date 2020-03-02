import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ResourcesService } from '@web-portal/core/services/resources/resources.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-resources-most-recent',
  templateUrl: './resources-most-recent.component.html',
  styleUrls: ['./resources-most-recent.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourcesMostRecentComponent implements OnInit {
  mostRecentResources$;
  loading$: Observable<boolean>;

  constructor(private resourcesService: ResourcesService) {
    this.mostRecentResources$ = this.resourcesService.getMostRecent();
    this.loading$ = this.resourcesService.loadingMostRecent$;
  }

  ngOnInit() {}
}
