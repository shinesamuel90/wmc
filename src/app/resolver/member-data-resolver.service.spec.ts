import { TestBed } from '@angular/core/testing';

import { MemberDataResolverService } from './member-data-resolver.service';

describe('MemberDataResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MemberDataResolverService = TestBed.get(MemberDataResolverService);
    expect(service).toBeTruthy();
  });
});
