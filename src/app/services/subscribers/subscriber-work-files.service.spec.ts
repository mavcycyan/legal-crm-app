import { TestBed } from '@angular/core/testing';

import { SubscriberWorkFilesService } from './subscriber-work-files.service';

describe('SubscriberWorkFilesService', () => {
  let service: SubscriberWorkFilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscriberWorkFilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
