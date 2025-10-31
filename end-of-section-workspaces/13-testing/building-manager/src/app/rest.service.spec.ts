import { TestBed } from '@angular/core/testing';

import { RestService } from './rest.service';
import { provideHttpClient } from '@angular/common/http';

describe('RestService', () => {
  let service: RestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [provideHttpClient()],
    });
    service = TestBed.inject(RestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
