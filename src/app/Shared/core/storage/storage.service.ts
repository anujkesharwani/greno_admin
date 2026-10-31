import { Dialog } from '@angular/cdk/dialog';
import { Injectable } from '@angular/core';
import { deleteObject, listAll, ref, uploadBytesResumable, Storage, getMetadata, getDownloadURL } from '@angular/fire/storage';
import { ManagerUiComponent } from './manager-ui/manager-ui.component';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private ROOT_PATH:string = 'library';
  constructor(private storage:Storage,private dialog:Dialog) { }

  async getFiles(path?:string){
    let list = await listAll(ref(this.storage,path ? path : this.ROOT_PATH));
    return await Promise.all(list.items.map(async (item)=>{
      return {
        name:item.name,
        metadata:(await getMetadata(ref(this.storage,item.fullPath))),
        url:(await getDownloadURL(ref(this.storage,item.fullPath)))
      }
    }));
  }

  async uploadFile(file:any,path?:string){
    path = path ? (path +'/'+ file.name) : (this.ROOT_PATH +'/'+ file.name);
    let fileRef = ref(this.storage,path ? path : this.ROOT_PATH);
    await uploadBytesResumable(fileRef, file);
    return getDownloadURL(fileRef)
  }

  async uploadNamedFile(file: any, fileName: string, path?: string) {
    path = path ? (path +'/'+ fileName) : (this.ROOT_PATH +'/'+ fileName);
    let fileRef = ref(this.storage, path ? path : this.ROOT_PATH);
    await uploadBytesResumable(fileRef, file);
    return getDownloadURL(fileRef)
  }

  deleteFile(file:any,path?:string){
    path = path ? (path +'/'+ file.name) : (this.ROOT_PATH +'/'+ file.name);
    return deleteObject(ref(this.storage,path));
  }

  deleteFileFromPath(path: string){
    return deleteObject(ref(this.storage, path));
  }

  async selectImage(multiple:boolean = false){
    let dialog = this.dialog.open(ManagerUiComponent,{data:{selectableType:'image',multiple: multiple}});
    dialog.disableClose = true;
    return await firstValueFrom(dialog.closed);
  }

  async selectVideo(){
    let dialog = this.dialog.open(ManagerUiComponent,{data:{selectableType:'video'}});
    dialog.disableClose = true;
    return await firstValueFrom(dialog.closed);
  }

  async selectAsset(){
    let dialog = this.dialog.open(ManagerUiComponent,{data:{selectableType:'both'}});
    dialog.disableClose = true;
    return await firstValueFrom(dialog.closed);
  }
}
