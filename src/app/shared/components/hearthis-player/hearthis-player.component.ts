import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-hearthis-player',
  templateUrl: './hearthis-player.component.html',
  styleUrls: ['./hearthis-player.component.css']
})
export class HearthisPlayerComponent implements OnInit, OnChanges {

  audioPlayerUrl: SafeResourceUrl;

  @Input() audioId: number;

  constructor(
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {

  }

  ngOnChanges(): void {
    // tslint:disable-next-line:max-line-length
    this.audioPlayerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://hearthis.at/embed/${this.audioId}/transparent/?hcolor=615d5c&color=b6b8b4&style=2&block_size=2&block_space=0&background=0&waveform=0&cover=1&autoplay=1&css=https://ekklesia-1476552990706.firebaseapp.com/assets/hearthis.css`);
  }

}
