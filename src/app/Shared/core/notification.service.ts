import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackbar:MatSnackBar) { }

  presentToast(message:string,duration:number = 2000){
    this.snackbar.open(message,'',{duration});
  }

  presentErrorToast(message:string,duration:number = 2000){
    this.snackbar.open(message,'',{duration,panelClass:'error-toast'});
  }

  presentSuccessToast(message:string,duration:number = 2000){
    this.snackbar.open(message,'',{duration,panelClass:'success-toast'});
  }

  presentWarningToast(message:string,duration:number = 2000){
    this.snackbar.open(message,'',{duration,panelClass:'warning-toast'});
  }

}
