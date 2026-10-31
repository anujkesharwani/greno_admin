import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-settings-main',
  templateUrl: './settings-main.component.html',
  styleUrls: ['./settings-main.component.scss'],
})
export class SettingsMainComponent {
  constructor(public AuthService:AuthService){}
  tabStatus: any = {
    users: false,
    admin: false,
    customer: true,
    agent: false,
    permission:false
  };

  changeTab(id: string) {
    Object.keys(this.tabStatus).forEach((key) => {
      this.tabStatus[key] = false;
    });
    this.tabStatus[id] = true;
  }
}
