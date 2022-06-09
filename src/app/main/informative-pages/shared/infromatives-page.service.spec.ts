import { TestBed } from '@angular/core/testing';

import { InfromativesPageService } from './infromatives-page.service';

describe('InfromativesPageService', () => {
  let service: InfromativesPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfromativesPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
