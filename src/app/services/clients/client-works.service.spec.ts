import { TestBed } from '@angular/core/testing';

import { ClientWorksService } from './client-works.service';

describe('ClientWorksService', () => {
  let service: ClientWorksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientWorksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
