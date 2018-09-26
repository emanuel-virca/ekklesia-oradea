import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialListContentLoaderComponent } from './material-list-content-loader.component';

describe('MaterialListContentLoaderComponent', () => {
  let component: MaterialListContentLoaderComponent;
  let fixture: ComponentFixture<MaterialListContentLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialListContentLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialListContentLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
