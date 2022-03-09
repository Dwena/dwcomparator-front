import { TestBed } from '@angular/core/testing';

import { UrlToCrawlService } from './url-to-crawl.service';

describe('UrlToCrawlService', () => {
  let service: UrlToCrawlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlToCrawlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
