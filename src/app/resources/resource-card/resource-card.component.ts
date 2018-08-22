import { Component, OnInit, Input } from '@angular/core';

import { Resource } from '../../shared/models/resource.model';
import { HearthisPlayerService } from '../../core/services/hearthis-player/hearthis-player.service';

@Component({
    selector: 'app-resource-card',
    templateUrl: './resource-card.component.html',
    styleUrls: ['./resource-card.component.css']
})
export class ResourceCardComponent implements OnInit {
    @Input() resource: Resource;

    constructor(
        private hearthisPlayerService: HearthisPlayerService,
    ) { }

    ngOnInit() {
    }

    public play() {
        this.hearthisPlayerService.play(this.resource.hearthisId);
    }
}
