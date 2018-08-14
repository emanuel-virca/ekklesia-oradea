import { TestBed, inject } from '@angular/core/testing';

import { HearthisPlayerService } from './hearthis-player.service';

describe('HearthisPlayerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HearthisPlayerService]
    });
  });

  it('should be created', inject([HearthisPlayerService], (service: HearthisPlayerService) => {
    expect(service).toBeTruthy();
  }));
});
