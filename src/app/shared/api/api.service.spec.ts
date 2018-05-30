import {TestBed, inject} from '@angular/core/testing';

import {ApiService} from './api.service';
import {TestingDepsModule} from '../testing-deps/testing-deps.module';

describe('ApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingDepsModule]
    });
  });

  it('should be created', inject([ApiService], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));
});
