import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BannerService } from 'src/app/settings/settings/banner/banner.service';
import { Banner } from '../content-management.component';
import { StorageService } from 'src/app/Shared/core/storage/storage.service';

@Component({
  selector: 'app-edit-banner-dialog',
  templateUrl: './edit-banner-dialog.component.html',
  styleUrls: ['./edit-banner-dialog.component.scss']
})
export class EditBannerDialogComponent {
  types: string[] = ['Url', 'App'];
  // appLinks: AppLink[] = [];
  imageSource: string = '';
  imageFile: any;
  imageUrl:string|undefined;

  constructor(
    public dialogRef: MatDialogRef<EditBannerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private oldBanner: Banner,
    private bannnerService: BannerService,
    private storageService:StorageService
  ) {}
  
  bannerForm = new FormGroup({
    title: new FormControl(this.oldBanner.title, Validators.required),
    bannerUrl: new FormControl(this.oldBanner.bannerUrl, Validators.required),
    start: new FormControl(this.oldBanner.start, Validators.required),
    end: new FormControl(this.oldBanner.end, Validators.required),
  });

  ngOnInit(): void {
    this.imageSource = this.oldBanner.img;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.bannerForm.status == 'VALID') {
      this.selectImage();
      let newBanner: Banner = {
        id:this.oldBanner.id,
        img: this.imageUrl!,
        title: this.title?.value,
        bannerUrl: this.bannerUrl?.value,
        start: this.start?.value,
        end: this.end?.value,
      };
      // console.log(newBanner)
      this.bannnerService.updateBanner(newBanner);
      this.dialogRef.close();
      alert('Banner Updated Successfully');
    } else {
      alert('Please fill form correctly');
    }
  }
  async selectImage(){
    let res = await this.storageService.selectImage();
    if(res){
      this.imageUrl = res as string;
    }
  }

  setImage(event: any) {
    // check if the image is valid and less than 500kb
    if (event.target.files[0].size > 1000000) {
      return;
    }
    if (
      event.target.files[0].type != 'image/jpeg' &&
      event.target.files[0].type != 'image/png'
    ) {
      return;
    }
    this.imageFile = event.target.files[0];
    var selectedFile = event.target.files[0];
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageSource = event.target.result;
    };

    reader.readAsDataURL(selectedFile);
  }

  clearImage() {
    this.imageFile = undefined;
    this.imageSource = '';
  }

  get title() {
    return this.bannerForm.get('title');
  }
  get bannerUrl() {
    return this.bannerForm.get('bannerUrl');
  }
  get start() {
    return this.bannerForm.get('start');
  }
  get end() {
    return this.bannerForm.get('end');
  }
}
