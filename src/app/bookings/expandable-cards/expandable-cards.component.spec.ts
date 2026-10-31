import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandableCardsComponent } from './expandable-cards.component';

describe('ExpandableCardsComponent', () => {
  let component: ExpandableCardsComponent;
  let fixture: ComponentFixture<ExpandableCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpandableCardsComponent]
    });
    fixture = TestBed.createComponent(ExpandableCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
