import { TestBed } from '@angular/core/testing';

import { AlbumdataService } from './albumdata.service';

describe('AlbumdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlbumdataService = TestBed.get(AlbumdataService);
    expect(service).toBeTruthy();
  });
});
