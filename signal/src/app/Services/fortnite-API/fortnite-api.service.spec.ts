import { TestBed, inject } from '@angular/core/testing';

import { FortniteApiService } from './fortnite-api.service';

describe('FortniteApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FortniteApiService]
    });
  });

  it('should be created', inject([FortniteApiService], (service: FortniteApiService) => {
    expect(service).toBeTruthy();
  }));
});
