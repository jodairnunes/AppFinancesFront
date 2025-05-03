import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(private router: Router, private toastrService: ToastrService) {}

  logout() {
    sessionStorage.removeItem('token');
    this.toastrService.warning('You Logout Dashboard!!!');
    this.router.navigateByUrl('login');
  }
}
