import { TestBed } from '@angular/core/testing';

import { SubscribersCalculationsService } from './subscribers-calculations.service';

describe('SubscribersCalculationsService', () => {
  let service: SubscribersCalculationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscribersCalculationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
