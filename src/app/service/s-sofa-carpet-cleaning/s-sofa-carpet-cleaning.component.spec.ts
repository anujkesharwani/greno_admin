import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SSofaCarpetCleaningComponent } from './s-sofa-carpet-cleaning.component';

describe('SSofaCarpetCleaningComponent', () => {
  let component: SSofaCarpetCleaningComponent;
  let fixture: ComponentFixture<SSofaCarpetCleaningComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SSofaCarpetCleaningComponent]
    });
    fixture = TestBed.createComponent(SSofaCarpetCleaningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
