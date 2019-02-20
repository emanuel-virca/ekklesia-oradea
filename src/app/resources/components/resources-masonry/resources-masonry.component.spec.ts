import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesMasonryComponent } from './resources-masonry.component';

describe('ResourcesMasonryComponent', () => {
  let component: ResourcesMasonryComponent;
  let fixture: ComponentFixture<ResourcesMasonryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourcesMasonryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcesMasonryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
