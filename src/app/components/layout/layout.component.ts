import { Component, OnInit } from '@angular/core';
import { FormRegisterComponent } from '../form-register/form-register.component';
import { FormLoginComponent } from '../form-login/form-login.component';

@Component({
  selector: 'app-layout',
  imports: [FormRegisterComponent, FormLoginComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit{

  showFormLogin: boolean = true;
  showFormRegister: boolean = false;

  titleRegister: string = '';

  ngOnInit(): void {
      this.setTitleBtn()
  }

  setTitleBtn() {
    if(this.showFormLogin) {
      this.titleRegister = 'Register'
    }else {
      this.titleRegister = 'Login';
    }
  }

  goToRegisterLogin() {
    this.showFormLogin = !this.showFormLogin;
    this.showFormRegister = !this.showFormRegister;
    this.setTitleBtn();
  }

  updateShowForm() {
    this.showFormLogin = !this.showFormLogin;
    this.showFormRegister = !this.showFormRegister;
    this.setTitleBtn();
  }
}
