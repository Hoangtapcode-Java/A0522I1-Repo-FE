import { TestBed } from '@angular/core/testing';

import { CustomerRegHomeService } from './customer-reg-home.service';

describe('CustomerRegHomeService', () => {
  let service: CustomerRegHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerRegHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
