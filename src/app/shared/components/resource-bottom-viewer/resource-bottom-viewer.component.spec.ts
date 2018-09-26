import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceBottomViewerComponent } from './resource-bottom-viewer.component';

describe('NavBottomComponent', () => {
  let component: ResourceBottomViewerComponent;
  let fixture: ComponentFixture<ResourceBottomViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceBottomViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceBottomViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
