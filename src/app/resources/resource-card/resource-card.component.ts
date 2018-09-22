import { Component, OnInit, Input} from '@angular/core';

import { Resource } from '../../shared/models/resource.model';
import { HearthisPlayerService } from '../../core/services/hearthis-player/hearthis-player.service';

@Component({
    selector: 'app-resource-card',
    templateUrl: './resource-card.component.html',
    styleUrls: ['./resource-card.component.scss']
})
export class ResourceCardComponent implements OnInit {
    @Input() resource: Resource;
    @Input() width;
    height: number;

    constructor(
        private hearthisPlayerService: HearthisPlayerService,
    ) {
    }

    ngOnInit() {
        this.height = this.computeHeight();
    }

    public play() {
        this.hearthisPlayerService.play(this.resource.hearthisId);
    }

    computeHeight() {
        return (this.resource.height / this.resource.width) * this.width;
    }
}
