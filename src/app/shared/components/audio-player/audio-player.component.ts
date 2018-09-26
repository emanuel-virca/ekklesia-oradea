import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

import { Resource } from '../../models/resource.model';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.css']
})
export class AudioPlayerComponent implements OnInit, OnChanges {

  audioPlayerUrl: SafeResourceUrl;

  @Input() resource: Resource;

  constructor(
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    if (!this.resource) { return; }
  }

  ngOnChanges(): void {
    // tslint:disable-next-line:max-line-length
    this.audioPlayerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://hearthis.at/embed/${this.resource.hearthisId}/transparent/?hcolor=615d5c&color=b6b8b4&style=2&block_size=2&block_space=0&background=0&waveform=0&cover=1&autoplay=1&css=https://ekklesia-oradea-705d6.firebaseapp.com/assets/hearthis.css`);
  }

}
