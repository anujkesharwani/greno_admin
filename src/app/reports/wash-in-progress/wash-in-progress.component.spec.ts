import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WashInProgressComponent } from './wash-in-progress.component';

describe('WashInProgressComponent', () => {
  let component: WashInProgressComponent;
  let fixture: ComponentFixture<WashInProgressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WashInProgressComponent]
    });
    fixture = TestBed.createComponent(WashInProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
