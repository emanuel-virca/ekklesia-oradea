import { TestBed } from '@angular/core/testing';

import { ResourceViewerService } from './resource-viewer.service';

describe('ResourceViewerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResourceViewerService = TestBed.get(ResourceViewerService);
    expect(service).toBeTruthy();
  });
});
