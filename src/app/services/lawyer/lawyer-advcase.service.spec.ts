import { TestBed } from '@angular/core/testing';

import { LawyerAdvcaseService } from './lawyer-advcase.service';

describe('LawyerAdvcaseService', () => {
  let service: LawyerAdvcaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LawyerAdvcaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
