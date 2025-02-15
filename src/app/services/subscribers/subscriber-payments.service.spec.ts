import { TestBed } from '@angular/core/testing';

import { SubscriberPaymentsServiceTsService } from './subscriber-payments.service.ts.service';

describe('SubscriberPaymentsServiceTsService', () => {
  let service: SubscriberPaymentsServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscriberPaymentsServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
