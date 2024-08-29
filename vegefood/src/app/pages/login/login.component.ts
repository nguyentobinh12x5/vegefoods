import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;

  passWordValidator(): ValidatorFn {
    return (control) => {
      const minLength = control.value ? control.value.length >= 6 : false;

      return minLength ? null : { passWordValidator: true };
    };
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      password: ['', this.passWordValidator()],
      email: ['', Validators.email],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const success = this.authService.login(email, password);
      if (success) {
        alert('Login successful!');
        this.router.navigate(['/']);
      } else {
        alert('Login failed.');
      }
    } else {
      alert('Please fill out the form correctly.');
    }
  }
}
