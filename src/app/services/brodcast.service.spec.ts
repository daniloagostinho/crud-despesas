import { TestBed } from '@angular/core/testing';

import { BrodcastService } from './brodcast.service';

describe('BrodcastService', () => {
  let service: BrodcastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrodcastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
