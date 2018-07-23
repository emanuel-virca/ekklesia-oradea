import { Component, OnInit, Input } from '@angular/core';

import { Resource } from '../../shared/models/resource.model';

@Component({
    selector: 'app-resource-card',
    templateUrl: './resource-card.component.html',
    styleUrls: ['./resource-card.component.css']
})
export class ResourceCardComponent implements OnInit {
    @Input() resource: Resource;

    constructor() { }

    ngOnInit() {
    }
}
