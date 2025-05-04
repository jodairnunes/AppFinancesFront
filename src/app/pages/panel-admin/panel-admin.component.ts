import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-panel-admin',
  imports: [RouterOutlet],
  templateUrl: './panel-admin.component.html',
  styleUrl: './panel-admin.component.scss'
})
export class PanelAdminComponent {
  constructor(private router: Router, private toastrService: ToastrService) {}

  logout() {
    sessionStorage.removeItem('token');
    this.toastrService.warning('You Logout Account!!!');
    this.router.navigateByUrl('login');
  }
}
