import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPieComponent } from './category-pie.component';

describe('CategoryPieComponent', () => {
  let component: CategoryPieComponent;
  let fixture: ComponentFixture<CategoryPieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryPieComponent]
    });
    fixture = TestBed.createComponent(CategoryPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
