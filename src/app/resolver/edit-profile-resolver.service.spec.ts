import { TestBed } from '@angular/core/testing';

import { EditProfileResolverService } from './edit-profile-resolver.service';

describe('EditProfileResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditProfileResolverService = TestBed.get(EditProfileResolverService);
    expect(service).toBeTruthy();
  });
});
