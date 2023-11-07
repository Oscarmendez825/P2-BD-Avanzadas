import { TestBed } from '@angular/core/testing';

import { PutServiceService } from './put-service.service';

describe('PutServiceService', () => {
  let service: PutServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PutServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
