import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatCardSubtitleContentLoaderComponent } from './mat-card-subtitle-content-loader.component';

describe('MatCardSubtitleContentLoaderComponent', () => {
  let component: MatCardSubtitleContentLoaderComponent;
  let fixture: ComponentFixture<MatCardSubtitleContentLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MatCardSubtitleContentLoaderComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatCardSubtitleContentLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
