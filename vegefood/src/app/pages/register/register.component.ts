import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormGroup,
  ValidatorFn,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;

  specialCharacterValidator(): ValidatorFn {
    return (control) => {
      const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
        control.value
      );

      return hasSpecialCharacter ? { hasSpecialCharacter: true } : null;
    };
  }

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
    this.registerForm = this.formBuilder.group({
      username: ['', this.specialCharacterValidator()],
      password: ['', this.passWordValidator()],
      email: ['', Validators.email],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { username, email, password } = this.registerForm.value;
      const success = this.authService.register(username, email, password);
      if (success) {
        alert('Registration successful!');
        this.router.navigate(['/login']);
      } else {
        alert('Registration failed.');
      }
    } else {
      alert('Please fill out the form correctly.');
    }
  }
}
