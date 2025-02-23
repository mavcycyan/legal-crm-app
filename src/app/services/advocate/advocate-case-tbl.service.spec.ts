import { TestBed } from '@angular/core/testing';

import { AdvocateCaseTblService } from './advocate-case-tbl.service';

describe('AdvocateCaseTblService', () => {
  let service: AdvocateCaseTblService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvocateCaseTblService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
