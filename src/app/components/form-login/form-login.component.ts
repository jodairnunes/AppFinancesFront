import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-form-login',
  imports: [ReactiveFormsModule],
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.scss',
})
export class FormLoginComponent {
  formLogin!: FormGroup;

  constructor(private router: Router, private authService: AuthService) {
    this.formLogin = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  login() {
    this.authService
      .login(this.formLogin.value.email, this.formLogin.value.password)
      .subscribe({
        next: (res) => {
          console.log('Login successful:', res.token);
          this.router.navigateByUrl('dashboard');
        },
        error: (err) => console.error('Erro:', err),
      });
  }
}
