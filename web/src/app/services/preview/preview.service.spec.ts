import { TestBed, inject } from '@angular/core/testing';

import { PreviewService } from './preview.service';

describe('PreviewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreviewService]
    });
  });

  it('should be created', inject([PreviewService], (service: PreviewService) => {
    expect(service).toBeTruthy();
  }));
});
