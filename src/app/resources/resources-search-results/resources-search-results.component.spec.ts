import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesSearchResultsComponent } from './resources-search-results.component';

describe('ResourcesSearchResultsComponent', () => {
  let component: ResourcesSearchResultsComponent;
  let fixture: ComponentFixture<ResourcesSearchResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourcesSearchResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcesSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
