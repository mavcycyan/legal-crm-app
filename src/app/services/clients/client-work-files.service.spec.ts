import { TestBed } from '@angular/core/testing';

import { ClientWorkFilesService } from './client-work-files.service';

describe('ClientWorkFilesService', () => {
  let service: ClientWorkFilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientWorkFilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
