import { TestBed } from '@angular/core/testing';

import { AlbumDataResolverService } from './album-data-resolver.service';

describe('AlbumDataResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlbumDataResolverService = TestBed.get(AlbumDataResolverService);
    expect(service).toBeTruthy();
  });
});
