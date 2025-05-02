import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-form-register',
  imports: [ReactiveFormsModule],
  templateUrl: './form-register.component.html',
  styleUrl: './form-register.component.scss'
})
export class FormRegisterComponent {
  formregister!: FormGroup;

  constructor(private router: Router, private authService: AuthService) {
    this.formregister = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  register() {
    this.authService
      .register(this.formregister.value.name, this.formregister.value.email, this.formregister.value.password)
      .subscribe({
        next: (res) => {
          console.log('Registration successful: ', res.email);
          this.router.navigateByUrl('login');
        },
        error: (err) => console.error('Erro:', err),
      });
  }
}
