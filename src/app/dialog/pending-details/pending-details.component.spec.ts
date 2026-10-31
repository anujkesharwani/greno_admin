import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingDetailsComponent } from './pending-details.component';

describe('PendingDetailsComponent', () => {
  let component: PendingDetailsComponent;
  let fixture: ComponentFixture<PendingDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PendingDetailsComponent]
    });
    fixture = TestBed.createComponent(PendingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
