import { AdminResourcesModule } from './resources.module';

describe('ResourcesModule', () => {
  let resourcesModule: AdminResourcesModule;

  beforeEach(() => {
    resourcesModule = new AdminResourcesModule();
  });

  it('should create an instance', () => {
    expect(resourcesModule).toBeTruthy();
  });
});
