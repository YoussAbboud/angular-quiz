import { TestBed } from '@angular/core/testing';

import { UsersFilter } from './users-filter';

describe('UsersFilter', () => {
  let service: UsersFilter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersFilter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
