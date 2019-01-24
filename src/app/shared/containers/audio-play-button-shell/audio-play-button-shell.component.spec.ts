import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioPlayButtonShellComponent } from './audio-play-button-shell.component';

describe('AudioPlayButtonShellComponent', () => {
  let component: AudioPlayButtonShellComponent;
  let fixture: ComponentFixture<AudioPlayButtonShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioPlayButtonShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioPlayButtonShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
