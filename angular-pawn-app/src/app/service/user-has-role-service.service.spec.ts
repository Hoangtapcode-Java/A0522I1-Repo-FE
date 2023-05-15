import { TestBed } from '@angular/core/testing';

import { UserHasRoleServiceService } from './user-has-role-service.service';

describe('UserHasRoleServiceService', () => {
  let service: UserHasRoleServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserHasRoleServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
