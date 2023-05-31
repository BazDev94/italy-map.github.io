import { TestBed } from '@angular/core/testing';

import { MapSerivceService } from './map-serivce.service';

describe('MapSerivceService', () => {
  let service: MapSerivceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapSerivceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
