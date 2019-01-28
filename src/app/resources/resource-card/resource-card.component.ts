import { Component, OnInit, Input } from '@angular/core';

import { Resource } from '../../shared/models/resource.model';

@Component({
    selector: 'app-resource-card',
    templateUrl: './resource-card.component.html',
    styleUrls: ['./resource-card.component.scss']
})
export class ResourceCardComponent implements OnInit {
    @Input() resource: Resource;
    @Input() width;
    height: number;

    ngOnInit() {
        this.height = this.computeHeight();
    }

    computeHeight() {
        if (!this.resource) { return 0; }
        return (this.resource.height / this.resource.width) * this.width;
    }
}
