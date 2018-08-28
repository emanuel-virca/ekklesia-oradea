import { AdminSharedModule } from './shared.module';

describe('SharedModule', () => {
  let sharedModule: AdminSharedModule;

  beforeEach(() => {
    sharedModule = new AdminSharedModule();
  });

  it('should create an instance', () => {
    expect(sharedModule).toBeTruthy();
  });
});
