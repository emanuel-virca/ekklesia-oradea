import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HearthisPlayerComponent } from './hearthis-player.component';

describe('HearthisPlayerComponent', () => {
  let component: HearthisPlayerComponent;
  let fixture: ComponentFixture<HearthisPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HearthisPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HearthisPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
