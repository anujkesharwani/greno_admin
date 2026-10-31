import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaWiseCatalogueComponent } from './area-wise-catalogue.component';

describe('AreaWiseCatalogueComponent', () => {
  let component: AreaWiseCatalogueComponent;
  let fixture: ComponentFixture<AreaWiseCatalogueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AreaWiseCatalogueComponent]
    });
    fixture = TestBed.createComponent(AreaWiseCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
