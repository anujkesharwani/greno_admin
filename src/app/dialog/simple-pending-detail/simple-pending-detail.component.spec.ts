import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimplePendingDetailComponent } from './simple-pending-detail.component';

describe('SimplePendingDetailComponent', () => {
  let component: SimplePendingDetailComponent;
  let fixture: ComponentFixture<SimplePendingDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimplePendingDetailComponent]
    });
    fixture = TestBed.createComponent(SimplePendingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
