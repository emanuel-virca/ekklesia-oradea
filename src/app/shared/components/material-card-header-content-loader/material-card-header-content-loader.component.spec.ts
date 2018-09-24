import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialCardHeaderContentLoaderComponent } from './material-card-header-content-loader.component';

describe('MaterialCardHeaderContentLoaderComponent', () => {
  let component: MaterialCardHeaderContentLoaderComponent;
  let fixture: ComponentFixture<MaterialCardHeaderContentLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialCardHeaderContentLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialCardHeaderContentLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
