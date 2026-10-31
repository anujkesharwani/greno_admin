import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  name: string = "Pratap";
  password: string = "Pratap";

  constructor(
    private router: Router,
    public auth: AuthService
  ) { }

  submitted(adminForm: NgForm) {
    if (this.name == 'Pratap' && this.password == 'Pratap') {
      this.router.navigate(['/bookings']);
    } else {
      this.router.navigate(['/not-admin']);
    }
  }
}
