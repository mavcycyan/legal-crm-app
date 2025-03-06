import { TestBed } from '@angular/core/testing';

import { AdvocateWorkFilesService } from './advocate-work-files.service';

describe('AdvocateWorkFilesService', () => {
  let service: AdvocateWorkFilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvocateWorkFilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
