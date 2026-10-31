import { Component } from '@angular/core';

@Component({
  selector: 'app-service-main',
  templateUrl: './service-main.component.html',
  styleUrls: ['./service-main.component.scss']
})
export class ServiceMainComponent {

  tabStatus: any = {
    area: true,
    service: false,
    slot: false,
    items:false
  }
  changeTab(id: string) {
    Object.keys(this.tabStatus).forEach(key => {
      this.tabStatus[key] = false;
    })
    this.tabStatus[id] = true;
  }
}
