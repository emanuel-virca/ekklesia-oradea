import { TestBed } from '@angular/core/testing';

import { AuthorEffects } from './author.effects';

describe('Author.Effects.TsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthorEffects = TestBed.get(AuthorEffects);
    expect(service).toBeTruthy();
  });
});
