import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Banner } from '../banner.structure';
import { Timestamp } from 'firebase/firestore';
import { StorageService } from 'src/app/Shared/core/storage/storage.service';
import { NotificationService } from 'src/app/Shared/core/notification.service';
import { LoaderService } from 'src/app/Shared/shared-services/loader.service';

@Component({
  selector: 'app-banner-dialog',
  templateUrl: './banner-dialog.component.html',
  styleUrls: ['./banner-dialog.component.scss'],
})
export class BannerDialogComponent implements OnInit {
  banner: Banner | undefined;
  editMode: boolean = false;
  maxSizeInMB: number = 2;
  dimensions: [number, number] = [0, 0];

  private firebaseStoragePath = `customer-settings/banners/section-${this.data.sectionId}`;

  constructor(
    private dialogRef: MatDialogRef<BannerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private alertify: NotificationService,
    private loader: LoaderService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    if (this.data.banner) {
      this.banner = { ...this.data.banner };
      this.editMode = true;
    } else {
      this.banner = {
        show: true,
      } as Banner;
      this.editMode = false;
    }
    switch (this.data.bannerType) {
      case 'desktop':
        this.dimensions = [1440, 430];
        break;

      case 'mobile':
        this.dimensions = [330, 150];
        break;
    }
  }

  uploadImage(event: Event) {
    const target = event.target as HTMLInputElement;
    if (!(target && target.files && target.files.length)) {
      return;
    }
    const file = target.files[0];
    if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
      target.value = '';
      this.alertify.presentErrorToast(
        'Invalid file type. Accepted types are jpg/jpeg and png.'
      );
      return;
    }
    if (file.size > this.maxSizeInMB * 1024 * 1024) {
      target.value = '';
      this.alertify.presentErrorToast(
        `Image size should be less than ${this.maxSizeInMB} KB.`
      );
      return;
    }
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        if (
          img.width === this.dimensions[0] &&
          img.height === this.dimensions[1]
        ) {
          this.alertify.presentToast('Uploading image...');
          let fileName = file.name;
          const split = fileName.split('.');
          split[split.length - 1] += `_${new Date().getTime()}`;
          fileName = split.join('.');
          this.storageService
            .uploadNamedFile(file, fileName, this.firebaseStoragePath)
            .then((path) => {
              this.banner!.imageUrl = path;
              this.banner!.fileName = fileName;
              target.value = '';
              this.alertify.presentSuccessToast('Image uploaded');
              this.loader.hideLoader();
            });
        } else {
          target.value = '';
          this.alertify.presentErrorToast(
            `Image dimensions should be ${this.dimensions.join('x')}.`
          );
          this.loader.hideLoader();
        }
      };
    };
    this.loader.showLoader();
    reader.readAsDataURL(file);
  }

  deleteImage() {
    if (!(this.banner?.imageUrl && this.banner?.fileName)) {
      return;
    }
    const path = this.firebaseStoragePath + '/' + this.banner!.fileName;
    if (this.editMode) {
      this.banner!.imageUrl = '';
      this.banner!.fileName = '';
      this.alertify.presentSuccessToast('Image removed');
      return;
    }
    this.alertify.presentToast('Removing image...');
    this.loader.showLoader();
    this.storageService.deleteFileFromPath(path).then(() => {
      this.banner!.imageUrl = '';
      this.banner!.fileName = '';
      this.alertify.presentSuccessToast('Image removed');
      this.loader.hideLoader();
    });
  }

  save(): void {
    if (!this.banner!.redirectUrl) {
      this.alertify.presentErrorToast('Please enter a redirect URL');
      return;
    }
    if (!(this.banner!.imageUrl && this.banner!.fileName)) {
      this.alertify.presentErrorToast('Please upload a banner');
      return;
    }
    this.banner!.createdAt = Timestamp.now();
    this.dialogRef.close(this.banner);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
