import { TestBed } from '@angular/core/testing';

import { ImageSilderService } from './image-silder.service';

describe('ImageSilderService', () => {
  let service: ImageSilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageSilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
