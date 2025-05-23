import { TestBed } from '@angular/core/testing';

import { PagiBackService } from './pagi.back.service';

describe('PagiBackService', () => {
  let service: PagiBackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagiBackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
