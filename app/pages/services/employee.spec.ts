import { TestBed } from '@angular/core/testing';

import { Employees } from './employee';

describe('Employee', () => {
  let service: Employees;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Employees);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
