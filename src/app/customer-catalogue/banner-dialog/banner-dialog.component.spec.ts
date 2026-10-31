import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerDialogComponent } from './banner-dialog.component';

describe('BannerDialogComponent', () => {
  let component: BannerDialogComponent;
  let fixture: ComponentFixture<BannerDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BannerDialogComponent]
    });
    fixture = TestBed.createComponent(BannerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
