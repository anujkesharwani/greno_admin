import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotCompletedDetailsComponent } from './not-completed-details.component';

describe('NotCompletedDetailsComponent', () => {
  let component: NotCompletedDetailsComponent;
  let fixture: ComponentFixture<NotCompletedDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotCompletedDetailsComponent]
    });
    fixture = TestBed.createComponent(NotCompletedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
