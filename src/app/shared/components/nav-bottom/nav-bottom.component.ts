import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { AudioPlayerService } from 'src/app/core/services/audio-player/audio-player.service';
import { AudioResource } from '../../models/audio-resource.model';

@Component({
  selector: 'app-nav-bottom',
  templateUrl: './nav-bottom.component.html',
  styleUrls: ['./nav-bottom.component.scss']
})
export class NavBottomComponent implements OnInit {
  currentAudioResource: Observable<AudioResource>;

  constructor(
    private audioPlayerService: AudioPlayerService,
  ) {
    this.currentAudioResource = this.audioPlayerService.audioResourceSubject;
  }

  ngOnInit() {
  }

}
