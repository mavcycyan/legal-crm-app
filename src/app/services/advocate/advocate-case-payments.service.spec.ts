import { TestBed } from '@angular/core/testing';

import { AdvocateCasePaymentsService } from './advocate-case-payments.service';

describe('AdvocateCasePaymentsServiceTsService', () => {
  let service: AdvocateCasePaymentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvocateCasePaymentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
