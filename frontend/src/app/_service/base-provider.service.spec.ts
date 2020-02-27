import { TestBed } from '@angular/core/testing';

import { BaseProviderService } from './base-provider.service';

describe('BaseProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BaseProviderService = TestBed.get(BaseProviderService);
    expect(service).toBeTruthy();
  });
});
