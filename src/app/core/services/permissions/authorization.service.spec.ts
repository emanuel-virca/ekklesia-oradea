import { TestBed, inject } from '@angular/core/testing';

import { AuthorizationService } from './authorization.service';

describe('PermissionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthorizationService]
    });
  });

  it('should be created', inject([AuthorizationService], (service: AuthorizationService) => {
    expect(service).toBeTruthy();
  }));
});
