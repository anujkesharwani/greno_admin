import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Banner } from '../content-management.component';
import { BannerService } from 'src/app/settings/settings/banner/banner.service';
import { StorageService } from 'src/app/Shared/core/storage/storage.service';

@Component({
  selector: 'app-add-new-banner-dialog',
  templateUrl: './add-new-banner-dialog.component.html',
  styleUrls: ['./add-new-banner-dialog.component.scss'],
})
export class AddNewBannerDialogComponent implements OnInit {
  types: string[] = ['Url', 'App'];
  // appLinks: AppLink[] = [];
  imageUrl:string|undefined;
  newBannerForm = new FormGroup({
    title: new FormControl('', Validators.required),
    bannerUrlType: new FormControl('url', Validators.required),
    bannerUrl: new FormControl('', Validators.required),
    bannerImage: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    enabled: new FormControl(true, Validators.required),
  });
  constructor(
    public dialogRef: MatDialogRef<AddNewBannerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private bannnerService: BannerService,
    private storageService: StorageService
  ) {}
  bannerForm = new FormGroup({
    title: new FormControl('', Validators.required),
    bannerUrl: new FormControl('', Validators.required),
    start: new FormControl('', Validators.required),
    end: new FormControl('', Validators.required),
    img: new FormControl('', ),
  });

  ngOnInit(): void {}

  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.bannerForm.status == 'VALID' && this.imageUrl) {
      this.selectImage();
      let newBanner: Banner = {
        img: this.imageUrl!,
        title: this.title?.value,
        bannerUrl: this.bannerUrl?.value,
        start: this.start?.value,
        end: this.end?.value,
      };
      this.bannnerService.addBanner(newBanner);
      this.dialogRef.close();
      alert('Banner Added Successfully');
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
