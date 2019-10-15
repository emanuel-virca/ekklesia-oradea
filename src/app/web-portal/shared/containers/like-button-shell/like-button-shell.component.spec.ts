import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeButtonShellComponent } from './like-button-shell.component';

describe('LikeButtonShellComponent', () => {
  let component: LikeButtonShellComponent;
  let fixture: ComponentFixture<LikeButtonShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LikeButtonShellComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LikeButtonShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
