import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorSignatureComponent } from './author-signature.component';

describe('AuthorSignatureComponent', () => {
  let component: AuthorSignatureComponent;
  let fixture: ComponentFixture<AuthorSignatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorSignatureComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorSignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
