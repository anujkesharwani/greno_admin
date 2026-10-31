import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SKitchenCleaningComponent } from './s-kitchen-cleaning.component';

describe('SKitchenCleaningComponent', () => {
  let component: SKitchenCleaningComponent;
  let fixture: ComponentFixture<SKitchenCleaningComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SKitchenCleaningComponent]
    });
    fixture = TestBed.createComponent(SKitchenCleaningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
