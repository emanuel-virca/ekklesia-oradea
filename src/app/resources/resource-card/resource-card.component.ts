import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Resource } from '../../shared/models/resource.model';
import { AudioPlayerService } from '../../core/services/audio-player/audio-player.service';
import { AudioResource } from '../../shared/models/audio-resource.model';

@Component({
    selector: 'app-resource-card',
    templateUrl: './resource-card.component.html',
    styleUrls: ['./resource-card.component.scss']
})
export class ResourceCardComponent implements OnInit, OnDestroy {
    @Input() resource: Resource;
    @Input() width;
    height: number;
    playing: boolean;
    audioPlayerSubscription: Subscription;

    constructor(
        private audioPlayerService: AudioPlayerService,
    ) {
    }

    ngOnInit() {
        this.height = this.computeHeight();
        this.audioPlayerSubscription = this.audioPlayerService.audioPlayerSubject
            .subscribe(audioState => this.playing = (audioState.audioId === this.resource.id && audioState.state === 'playing'));
    }

    public togglePlay() {
        if (!this.playing) { this.play(); } else { this.pause(); }
    }

    public play() {
        this.audioPlayerService.play(new AudioResource(this.resource));
    }

    public pause() {
        this.audioPlayerService.pause();
    }

    computeHeight() {
        return (this.resource.height / this.resource.width) * this.width;
    }

    ngOnDestroy(): void {
        this.audioPlayerSubscription.unsubscribe();
    }
}
