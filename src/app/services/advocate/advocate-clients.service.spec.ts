import { TestBed } from '@angular/core/testing';

import { AdvocateClientsService } from './advocate-clients.service';

describe('AdvocateClientsService', () => {
  let service: AdvocateClientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvocateClientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
