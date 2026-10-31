import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitDetialsDialogComponent } from './debit-detials-dialog.component';

describe('DebitDetialsDialogComponent', () => {
  let component: DebitDetialsDialogComponent;
  let fixture: ComponentFixture<DebitDetialsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DebitDetialsDialogComponent]
    });
    fixture = TestBed.createComponent(DebitDetialsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
