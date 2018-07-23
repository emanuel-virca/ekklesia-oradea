import { ApplicationPipesModule } from './application-pipes.module';

describe('ApplicationPipesModule', () => {
  let applicationPipesModule: ApplicationPipesModule;

  beforeEach(() => {
    applicationPipesModule = new ApplicationPipesModule();
  });

  it('should create an instance', () => {
    expect(applicationPipesModule).toBeTruthy();
  });
});
