import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobImagesComponent } from './job-images.component';

describe('JobImagesComponent', () => {
  let component: JobImagesComponent;
  let fixture: ComponentFixture<JobImagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobImagesComponent]
    });
    fixture = TestBed.createComponent(JobImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
