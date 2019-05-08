import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceShellComponent } from './resource-shell.component';

describe('ResourceShellComponent', () => {
  let component: ResourceShellComponent;
  let fixture: ComponentFixture<ResourceShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResourceShellComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
