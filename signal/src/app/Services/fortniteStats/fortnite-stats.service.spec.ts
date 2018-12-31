import { TestBed, inject } from '@angular/core/testing';

import { FortniteStatsService } from './fortnite-stats.service';

describe('FortniteStatsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FortniteStatsService]
    });
  });

  it('should be created', inject([FortniteStatsService], (service: FortniteStatsService) => {
    expect(service).toBeTruthy();
  }));
});
