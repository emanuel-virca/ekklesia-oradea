import { TestBed, inject } from '@angular/core/testing';

import { AudioPlayerService } from './audio-player.service';

describe('HearthisPlayerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AudioPlayerService]
    });
  });

  it('should be created', inject([AudioPlayerService], (service: AudioPlayerService) => {
    expect(service).toBeTruthy();
  }));
});
