import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryDialogComponent } from './history-dialog.component';

describe('HistoryDialogComponent', () => {
  let component: HistoryDialogComponent;
  let fixture: ComponentFixture<HistoryDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryDialogComponent]
    });
    fixture = TestBed.createComponent(HistoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
