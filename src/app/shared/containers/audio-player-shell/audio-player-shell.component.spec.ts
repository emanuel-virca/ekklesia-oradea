import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioPlayerShellComponent } from './audio-player-shell.component';

describe('AudioPlayerShellComponent', () => {
  let component: AudioPlayerShellComponent;
  let fixture: ComponentFixture<AudioPlayerShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioPlayerShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioPlayerShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
