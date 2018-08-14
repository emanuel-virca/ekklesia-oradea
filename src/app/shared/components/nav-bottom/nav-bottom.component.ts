import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { HearthisPlayerService } from '../../../core/services/hearthis-player/hearthis-player.service';
import { HearthisPlayerState } from '../../../core/models/hearthis-player-state';

@Component({
  selector: 'app-nav-bottom',
  templateUrl: './nav-bottom.component.html',
  styleUrls: ['./nav-bottom.component.css']
})
export class NavBottomComponent implements OnInit, OnDestroy {
  audioToPlay: number = null;

  private hearthisPlayerStateChanged: Subscription;

  constructor(private hearthisPlayerService: HearthisPlayerService) { }

  ngOnInit() {
    this.hearthisPlayerStateChanged = this.hearthisPlayerService.hearthisPlayerState
      .subscribe((state: HearthisPlayerState) => this.audioToPlay = state.play);
  }

  ngOnDestroy() {
    this.hearthisPlayerStateChanged.unsubscribe();
  }

}
