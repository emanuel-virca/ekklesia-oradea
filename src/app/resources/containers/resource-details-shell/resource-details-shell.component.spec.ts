import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceDetailsShellComponent } from './resource-details-shell.component';

describe('ResourceDetailsShellComponent', () => {
  let component: ResourceDetailsShellComponent;
  let fixture: ComponentFixture<ResourceDetailsShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceDetailsShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceDetailsShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
