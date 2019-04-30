import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceDetailsComponent } from './resource-details.component';

describe('ResourceDetailsComponent', () => {
  let component: ResourceDetailsComponent;
  let fixture: ComponentFixture<ResourceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResourceDetailsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
