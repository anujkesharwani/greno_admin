import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewBannerDialogComponent } from './add-new-banner-dialog.component';

describe('AddNewBannerDialogComponent', () => {
  let component: AddNewBannerDialogComponent;
  let fixture: ComponentFixture<AddNewBannerDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewBannerDialogComponent]
    });
    fixture = TestBed.createComponent(AddNewBannerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
