import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatCardAvatarContentLoaderComponent } from './mat-card-avatar-content-loader.component';

describe('MatCardAvatarContentLoaderComponent', () => {
  let component: MatCardAvatarContentLoaderComponent;
  let fixture: ComponentFixture<MatCardAvatarContentLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MatCardAvatarContentLoaderComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatCardAvatarContentLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
