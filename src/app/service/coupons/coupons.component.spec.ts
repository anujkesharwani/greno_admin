import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponsComponent } from './CouponsComponent';

describe('CouponsComponent', () => {
  let component: CouponsComponent;
  let fixture: ComponentFixture<CouponsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CouponsComponent],
    });
    fixture = TestBed.createComponent(CouponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
