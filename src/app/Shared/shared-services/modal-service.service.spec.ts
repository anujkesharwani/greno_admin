import { TestBed } from '@angular/core/testing';

import { confirmationDialogService } from './modal-service.service';

describe('confirmationDialogService', () => {
  let service: confirmationDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(confirmationDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
