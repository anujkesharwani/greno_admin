import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SBathroomCleaningComponent } from './s-bathroom-cleaning.component';

describe('SBathroomCleaningComponent', () => {
  let component: SBathroomCleaningComponent;
  let fixture: ComponentFixture<SBathroomCleaningComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SBathroomCleaningComponent]
    });
    fixture = TestBed.createComponent(SBathroomCleaningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
