import { TestBed } from '@angular/core/testing';

import { UserAccessPermissionService } from './user-access-permission.service';

describe('UserAccessPermissionService', () => {
  let service: UserAccessPermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAccessPermissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
