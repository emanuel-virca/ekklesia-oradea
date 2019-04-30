import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ResourceCardComponent } from './resource-card.component';
import { Resource } from '@shared/models/resource.model';

describe('ResourceCardComponent', () => {
  let component: ResourceCardComponent;
  let fixture: ComponentFixture<ResourceCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResourceCardComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceCardComponent);
    component = fixture.componentInstance;
    component.resource = new Resource();
    fixture.detectChanges();
  });

  // it('should create', () => {
  //     expect(component).toBeTruthy();
  // });
});
