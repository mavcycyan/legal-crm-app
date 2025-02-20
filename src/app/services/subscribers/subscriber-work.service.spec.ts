import { TestBed } from '@angular/core/testing';

import { SubscriberWorkService } from './subscriber-work.service';

describe('SubscriberWorkService', () => {
  let service: SubscriberWorkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscriberWorkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
