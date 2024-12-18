import { TestBed } from '@angular/core/testing';

import { SubscriberWorksService } from './subscriber-works.service';

describe('SubscriberWorksService', () => {
  let service: SubscriberWorksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscriberWorksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
