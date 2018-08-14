import { TestBed, inject } from '@angular/core/testing';

import { ResourceSearchService } from './resource-search.service';

describe('ResourceSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResourceSearchService]
    });
  });

  it('should be created', inject([ResourceSearchService], (service: ResourceSearchService) => {
    expect(service).toBeTruthy();
  }));
});
