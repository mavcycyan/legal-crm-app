import { TestBed } from '@angular/core/testing';

import { ClientWorkPaymentsService } from './client-work-payments.service';

describe('ClientWorkPaymentsService', () => {
  let service: ClientWorkPaymentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientWorkPaymentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
