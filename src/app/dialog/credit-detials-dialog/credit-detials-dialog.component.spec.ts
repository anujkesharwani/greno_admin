import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditDetialsDialogComponent } from './credit-detials-dialog.component';

describe('CreditDetialsDialogComponent', () => {
  let component: CreditDetialsDialogComponent;
  let fixture: ComponentFixture<CreditDetialsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreditDetialsDialogComponent]
    });
    fixture = TestBed.createComponent(CreditDetialsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
