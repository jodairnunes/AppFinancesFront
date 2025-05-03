import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-register',
  imports: [ReactiveFormsModule],
  templateUrl: './form-register.component.html',
  styleUrl: './form-register.component.scss'
})
export class FormRegisterComponent {
  @Output() updateShowForm = new EventEmitter();
  formregister!: FormGroup;

  constructor(private router: Router, private authService: AuthService,private toastrService: ToastrService) {
    this.formregister = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      repeatPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }

  register() {
    if(this.formregister.invalid){
      if(this.formregister.value.password !== this.formregister.value.repeatPassword){
        this.toastrService.error('Passwords do not match!!!');
      }else {
        this.toastrService.error('Invalid data!!!');
      }
      this.formregister.reset();
      return;
    }
    this.authService
      .register(this.formregister.value.name, this.formregister.value.email, this.formregister.value.password)
      .subscribe({
        next: () => {
          this.toastrService.success('Register successful!!!')
        },
        error: () => {
          this.toastrService.error('Credentials invalid!!!');
        } 
      });
      this.goToLoginForm();
  }

  goToLoginForm() {
    this.updateShowForm.emit();
  }
}
