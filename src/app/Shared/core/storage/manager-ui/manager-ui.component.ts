import { Component, Inject, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { NotificationService } from '../../notification.service';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-manager-ui',
  templateUrl: './manager-ui.component.html',
  styleUrls: ['./manager-ui.component.scss']
})
export class ManagerUiComponent implements OnInit {
  assets:{
    name:string,
    mediaType:'image'|'video',
    url:string,
    metadata:any;
  }[] = [];

  selectedIndex:number= 0;
  selectedIndexes:number[] = [];

  constructor(private storageService:StorageService,private notificationService:NotificationService,public dialogRef:DialogRef,@Inject(DIALOG_DATA) public managerSettings:{selectableType:'image'|'video'|'both', multiple:boolean}){}

  ngOnInit(): void {
    this.getFiles();
  }

  getFiles(){
    this.assets = [];
    this.storageService.getFiles().then((res)=>{
      this.assets = [];
      res.forEach((item)=>{
        if (this.managerSettings.selectableType == 'both' && (item.metadata.contentType?.split('/')[0] == 'image' || item.metadata.contentType?.split('/')[0] == 'video')){
          this.assets.push({
            name:item.name,
            mediaType:item.metadata.contentType?.split('/')[0] as 'image'|'video',
            url:item.url,
            metadata:item.metadata
          });
        } else if (this.managerSettings.selectableType == 'image' && item.metadata.contentType?.split('/')[0] == 'image'){
          this.assets.push({
            name:item.name,
            mediaType:item.metadata.contentType?.split('/')[0] as 'image',
            url:item.url,
            metadata:item.metadata
          });
        } else if (this.managerSettings.selectableType == 'video' && item.metadata.contentType?.split('/')[0] == 'video'){
          this.assets.push({
            name:item.name,
            mediaType:item.metadata.contentType?.split('/')[0] as 'video',
            url:item.url,
            metadata:item.metadata
          });
        }
      });
    });
  }

  copyLink(event:any,asset:any){
    event.stopPropagation();
    navigator.clipboard.writeText(asset.url);
    this.notificationService.presentToast('Link copied to clipboard');
  }

  deleteImage(){
    this.storageService.deleteFile(this.assets[this.selectedIndex]).then((res)=>{
      this.notificationService.presentToast('File deleted');
      this.assets.splice(this.selectedIndex,1);
      this.getFiles();
    })
  }

  async uploadFile(event:any){
    let images:File[] = Array.from(event.target.files);
    // filter images allow only jpg, png, jpeg, mp4 assets
    images = images.filter((file)=>{
      return file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'video/mp4';
    });
    Promise.all(images.map(async (file)=>{
      await this.storageService.uploadFile(file);
    })).then((res)=>{
      this.notificationService.presentToast('Files uploaded');
      this.getFiles();
    }).catch((err)=>{
      console.log(err);
      this.notificationService.presentToast('Error uploading files');
      this.getFiles();
    });
  }

  isImage(fileUrl:string){

  }

  select(){
    if (this.managerSettings.multiple){
      this.dialogRef.close(this.selectedIndexes.map((item,index)=>this.assets[item].url));
    } else {
      this.dialogRef.close(this.assets[this.selectedIndex].url)
    }
  }

  selectImage(index:number){
    if (this.managerSettings.multiple){
      if (this.selectedIndexes.includes(index)){
        this.selectedIndexes.splice(this.selectedIndexes.indexOf(index),1);
      } else {
        this.selectedIndexes.push(index);
      }
    } else {
      this.selectedIndex = index;
    }
  }
}
