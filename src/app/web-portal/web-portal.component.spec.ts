import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebPortalComponent } from './web-portal.component';

describe('WebPortalComponent', () => {
  let component: WebPortalComponent;
  let fixture: ComponentFixture<WebPortalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WebPortalComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
