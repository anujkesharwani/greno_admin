import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackupAndRestoreComponent } from './backup-and-restore.component';

describe('BackupAndRestoreComponent', () => {
  let component: BackupAndRestoreComponent;
  let fixture: ComponentFixture<BackupAndRestoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BackupAndRestoreComponent]
    });
    fixture = TestBed.createComponent(BackupAndRestoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
