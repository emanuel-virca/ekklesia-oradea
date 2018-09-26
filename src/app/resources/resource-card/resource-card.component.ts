import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { Resource } from '../../shared/models/resource.model';
import { AudioPlayerService } from '../../core/services/audio-player/audio-player.service';

@Component({
    selector: 'app-resource-card',
    templateUrl: './resource-card.component.html',
    styleUrls: ['./resource-card.component.css']
})
export class ResourceCardComponent implements OnInit {
    @Input() resource: Resource;
    @Input() width;
    height: number;

    @ViewChild('card') elementView: ElementRef;

    constructor(
        private audioPlayerService: AudioPlayerService,
    ) {
    }

    ngOnInit() {
        this.height = this.computeHeight();
    }

    public play() {
        this.audioPlayerService.play(this.resource.id);
    }

    computeHeight() {
        return (this.resource.height / this.resource.width) * this.width;
    }
}
