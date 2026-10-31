import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCataloguesComponent } from './service-catalogues.component';

describe('ServiceCataloguesComponent', () => {
  let component: ServiceCataloguesComponent;
  let fixture: ComponentFixture<ServiceCataloguesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceCataloguesComponent]
    });
    fixture = TestBed.createComponent(ServiceCataloguesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
