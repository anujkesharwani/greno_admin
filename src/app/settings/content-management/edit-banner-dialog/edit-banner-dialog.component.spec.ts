import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBannerDialogComponent } from './edit-banner-dialog.component';

describe('EditBannerDialogComponent', () => {
  let component: EditBannerDialogComponent;
  let fixture: ComponentFixture<EditBannerDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditBannerDialogComponent]
    });
    fixture = TestBed.createComponent(EditBannerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
