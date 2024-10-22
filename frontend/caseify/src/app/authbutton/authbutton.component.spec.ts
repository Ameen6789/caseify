import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthbuttonComponent } from './authbutton.component';

describe('AuthbuttonComponent', () => {
  let component: AuthbuttonComponent;
  let fixture: ComponentFixture<AuthbuttonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthbuttonComponent]
    });
    fixture = TestBed.createComponent(AuthbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
