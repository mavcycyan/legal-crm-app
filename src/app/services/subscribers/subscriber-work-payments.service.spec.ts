import { TestBed } from '@angular/core/testing';

import { SubscriberWorkPaymentsService } from './subscriber-work-payments.service';

describe('SubscriberWorkPaymentsService', () => {
  let service: SubscriberWorkPaymentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscriberWorkPaymentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
