import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { Resource } from '../../shared/models/resource.model';
import { AudioResource } from '../../shared/models/audio-resource.model';

import * as fromAudioPlayer from 'src/app/shared/stores/audio-player-store';
import * as fromAudioPlayerActions from 'src/app/shared/stores/audio-player-store/audio-player.actions';

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
        private store: Store<fromAudioPlayer.AppState>
    ) {
    }

    ngOnInit() {
        this.height = this.computeHeight();

        this.audioPlayerSubscription = this.store.pipe(select(fromAudioPlayer.getAudioPlayerState))
            .subscribe(state => this.playing = (state.current && state.current.id === this.resource.id && state.status === 'playing'));
    }

    public togglePlay() {
        if (!this.playing) { this.play(); } else { this.pause(); }
    }

    public play() {
        this.store.dispatch(new fromAudioPlayerActions.Select(new AudioResource(this.resource)));
    }

    public pause() {
        this.store.dispatch(new fromAudioPlayerActions.ChangeStatus('paused'));
    }

    computeHeight() {
        return (this.resource.height / this.resource.width) * this.width;
    }

    ngOnDestroy(): void {
        this.audioPlayerSubscription.unsubscribe();
    }
}
