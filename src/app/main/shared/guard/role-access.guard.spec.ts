import { TestBed } from '@angular/core/testing';

import { RoleAccessGuard } from './role-access.guard';

describe('RoleAccessGuard', () => {
  let guard: RoleAccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RoleAccessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
