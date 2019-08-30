import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MaterialCardHeaderContentLoaderComponent } from './material-card-header-content-loader.component';

describe('MaterialCardHeaderContentLoaderComponent', () => {
  let component: MaterialCardHeaderContentLoaderComponent;
  let fixture: ComponentFixture<MaterialCardHeaderContentLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MaterialCardHeaderContentLoaderComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialCardHeaderContentLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
