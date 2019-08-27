import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedResourcesComponent } from './liked-resources.component';

describe('LikedResourcesComponent', () => {
  let component: LikedResourcesComponent;
  let fixture: ComponentFixture<LikedResourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LikedResourcesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LikedResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
