import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizedesignComponent } from './customizedesign.component';

describe('CustomizedesignComponent', () => {
  let component: CustomizedesignComponent;
  let fixture: ComponentFixture<CustomizedesignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomizedesignComponent]
    });
    fixture = TestBed.createComponent(CustomizedesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
