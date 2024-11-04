import { TestBed } from '@angular/core/testing';

import { CApisService } from './capis.service';

describe('CApisService', () => {
  let service: CApisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CApisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
