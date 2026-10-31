import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SFullHomeCleaningComponent } from './s-full-home-cleaning.component';

describe('SFullHomeCleaningComponent', () => {
  let component: SFullHomeCleaningComponent;
  let fixture: ComponentFixture<SFullHomeCleaningComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SFullHomeCleaningComponent]
    });
    fixture = TestBed.createComponent(SFullHomeCleaningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
