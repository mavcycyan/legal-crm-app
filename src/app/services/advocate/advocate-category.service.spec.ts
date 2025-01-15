import { TestBed } from '@angular/core/testing';

import { AdvocateCategoryService } from './advocate-category.service';

describe('AdvocateCategoryService', () => {
  let service: AdvocateCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvocateCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
