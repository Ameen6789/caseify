import { TestBed } from '@angular/core/testing';

import { AuthbuttonService } from './authbutton.service';

describe('AuthbuttonService', () => {
  let service: AuthbuttonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthbuttonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
