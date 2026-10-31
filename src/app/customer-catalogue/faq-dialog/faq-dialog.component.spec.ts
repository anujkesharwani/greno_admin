import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FAQDialogComponent } from './faq-dialog.component';

describe('FAQDialogComponent', () => {
  let component: FAQDialogComponent;
  let fixture: ComponentFixture<FAQDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FAQDialogComponent]
    });
    fixture = TestBed.createComponent(FAQDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
