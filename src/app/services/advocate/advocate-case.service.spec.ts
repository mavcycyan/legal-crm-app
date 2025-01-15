import { TestBed } from '@angular/core/testing';

import { AdvocateCaseService } from './advocate-case.service';

describe('AdvocateCaseService', () => {
  let service: AdvocateCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvocateCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
