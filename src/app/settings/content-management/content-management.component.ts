import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BannerService } from 'src/app/settings/settings/banner/banner.service';
import { AddNewBannerDialogComponent } from './add-new-banner-dialog/add-new-banner-dialog.component';
import { EditBannerDialogComponent } from './edit-banner-dialog/edit-banner-dialog.component';

@Component({
  selector: 'app-content-management',
  templateUrl: './content-management.component.html',
  styleUrls: ['./content-management.component.scss'],
})
export class ContentManagementComponent implements OnInit {
  // data = [
  //   {
  //     title: 'Lorem Ipsum',
  //     bannerUrl: 'https://www.google.com',
  //     start: '21 Jan 2023',
  //     end: '26 Jan 2023',
  //     img: '/assets/banner.svg',
  //     icon: 'delete_outline',
  //   },
  //   {
  //     title: 'Lorem Ipsum',
  //     bannerUrl: 'https://www.google.com',
  //     start: '21 Jan 2023',
  //     end: '26 Jan 2023',
  //     img: '/assets/banner.svg',
  //     icon: 'delete_outline',
  //   },
  // ];

  bannerData: any[] = [];
  counter: number = 0;

  constructor(
    private bannerService: BannerService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getBanners();
  }

  getBanners(){
    this.bannerData=[];
    this.bannerService.getBanner().then((element) => {
      element.docs.map((doc) => {
        this.bannerData.push(doc.data());
        this.bannerData[this.counter++].id = doc.id;
      });
    });
  }

  banner: Banner = {
    img: '/assets/banner.svg',
    title: 'Lorem Ipsum',
    bannerUrl: 'https://www.google.com',
    start: '21 Jan 2023',
    end: '26 Jan 2023',
  };


  addBannerDialog() {
    const dialogRef = this.dialog.open(AddNewBannerDialogComponent);

    // dialogRef.beforeClosed().subscribe((data)=>{
    //   this.getBanners();
    // })
  }

  deleteBanner(id: string) {
    this.bannerService.deleteBanner(id);
    // this.getBanners();
  }

  editBanner(banner:Banner){
    const dialogRef = this.dialog.open(EditBannerDialogComponent,{
      data:banner
    });

    // dialogRef.beforeClosed().subscribe((data)=>{
    //   this.getBanners();
    // })
  }
}

export interface Banner {
  id?: string|null|undefined;
  title: string|null|undefined;
  bannerUrl: string|null|undefined;
  start: string|null|undefined;
  end: string|null|undefined;
  img: string;
  bannerNo?: number|null|undefined;
}
