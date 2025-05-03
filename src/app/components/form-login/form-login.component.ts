import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-login',
  imports: [ReactiveFormsModule],
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.scss',
})
export class FormLoginComponent {
  formLogin!: FormGroup;

  constructor(private router: Router, private authService: AuthService, private toastrService: ToastrService) {
    this.formLogin = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  login() {
    if(this.formLogin.invalid){
      this.toastrService.error('Invalid data!!!');
      return;
    }
    this.authService
      .login(this.formLogin.value.email, this.formLogin.value.password)
      .subscribe({
        next: () => {
          this.toastrService.success('Login successful!!!');
          this.router.navigateByUrl('dashboard');
        },
        error: () => this.toastrService.error('Credentials invalid!!!')
      });
  }
}
