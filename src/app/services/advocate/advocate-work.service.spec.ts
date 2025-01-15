import { TestBed } from '@angular/core/testing';

import { AdvocateWorkService } from './advocate-work.service';

describe('AdvocateWorkService', () => {
  let service: AdvocateWorkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvocateWorkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
