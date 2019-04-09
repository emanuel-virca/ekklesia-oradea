import { TestBed } from '@angular/core/testing';

import { NotificationTokenService } from './notification-token.service';

describe('NotificationTokenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotificationTokenService = TestBed.get(NotificationTokenService);
    expect(service).toBeTruthy();
  });
});
