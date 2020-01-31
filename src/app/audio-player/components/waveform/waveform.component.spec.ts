import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioWaveformComponent } from './waveform.component';

describe('WaveformComponent', () => {
  let component: AudioWaveformComponent;
  let fixture: ComponentFixture<AudioWaveformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AudioWaveformComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioWaveformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
