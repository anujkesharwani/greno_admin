import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent {

  clicked: boolean = false;

  constructor(
    public router: Router,
    public route: ActivatedRoute
  ) {

  }

  settings = [
    {
      name: 'General Settings:',
      link: 'general-settings'
    },
    {
      name: 'Email and Notification Settings',
      link: 'email-and-notification-settings'
    },
    {
      name: 'System Logs and Auditing',
      link: 'system-logs-and-auditing'
    },
    {
      name: 'Backup and Restore',
      link: 'backup-and-restore'
    },
    {
      name: 'Security Settings',
      link: 'security-settings'
    }
  ];

  navigateTo(link: string) {
    this.clicked = true;
    this.router.navigate([`${link}`], { relativeTo: this.route });
  }
}
