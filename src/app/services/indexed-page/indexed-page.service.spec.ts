import { TestBed } from '@angular/core/testing';

import { IndexedPageService } from './indexed-page.service';

describe('IndexedPageService', () => {
  let service: IndexedPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndexedPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
