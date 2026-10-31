import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCatalogueComponent } from './customer-catalogue.component';

describe('CustomerCatalogueComponent', () => {
  let component: CustomerCatalogueComponent;
  let fixture: ComponentFixture<CustomerCatalogueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerCatalogueComponent]
    });
    fixture = TestBed.createComponent(CustomerCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
