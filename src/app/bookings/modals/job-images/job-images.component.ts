import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/Shared/core/notification.service';
import { StorageService } from 'src/app/Shared/core/storage/storage.service';
import { BookingService } from 'src/app/core/booking.service';

@Component({
  selector: 'app-job-images',
  templateUrl: './job-images.component.html',
  styleUrls: ['./job-images.component.scss'],
})
export class JobImagesComponent {
  tempImg = 'https://ik.imagekit.io/xji6otwwkb/default-image.jpg?updatedAt=1680849653455'
  beforePics: any = []
  afterPics: any = []
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<JobImagesComponent>,
    private bookingService: BookingService,
    private storageService: StorageService,
    private notificationService: NotificationService
  ) {
    
  }

  async uploadFile(event: any, isAfter: boolean){
    let images:File[] = Array.from(event.target.files);
    images = images.filter((file)=>{
      return file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'video/mp4';
    });
    if (isAfter) {
      this.afterPics = [...this.afterPics, ...images.map((image) => {
        return {isAfter, file: image, disp: URL.createObjectURL(image)}
      })]
    } else {
      this.beforePics = [...this.beforePics, ...images.map((image) => {
        return {isAfter, file: image, disp: URL.createObjectURL(image)}
      })]
    }
  }

  saveImages() {
    Promise.all([...this.beforePics, ...this.afterPics].map(async (data)=>{
      await this.storageService.uploadFile(data.file).then((path) => {
        if (data.isAfter) {
          this.afterPics = this.afterPics.filter((pic: any)=>{pic.disp != data.disp});
          this.data.picsAfter.push(path);
        } else {
          this.beforePics = this.beforePics.filter((pic: any)=>{pic.disp != data.disp});
          this.data.picsBefore.push(path);
        }
      });
    })).then((res)=>{
      this.bookingService.updateBookingPics(this.data.currentUser.userId, this.data.id, {
        picsAfter: this.data.picsAfter,
        picsBefore: this.data.picsBefore
      }).then(() => {
        this.notificationService.presentToast('Files uploaded');
        this.beforePics = []
        this.afterPics = []
      });
    }).catch((err)=>{
      this.notificationService.presentToast('Error uploading files');
    });
  }
}
