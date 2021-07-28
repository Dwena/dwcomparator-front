import { TestBed } from '@angular/core/testing';

import { TraningCenterService } from './traning-center.service';

describe('TraningCenterService', () => {
  let service: TraningCenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraningCenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
