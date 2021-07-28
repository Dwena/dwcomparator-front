import { TestBed } from '@angular/core/testing';

import { AllFormationService } from './all-formation.service';

describe('AllFormationService', () => {
  let service: AllFormationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllFormationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
