import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription, throttleTime } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { LoadingService } from '../../core/services/loading.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgClass, RouterLink],

  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);
  loadingService = inject(LoadingService);
  signInSub!: Subscription;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^\w{6,}$/),
    ]),
  });
  loginSubmit() {
    if (this.loginForm.valid) {
      this.authService
        .signIn(this.loginForm.value)
        .pipe(throttleTime(3000))
        .subscribe({
          next: (res) => {
            if (res.message == 'success') {
              localStorage.setItem('token', res.token);
              this.authService.saveUserData();
              this.router.navigate(['/home']);
            }
          },
        });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
  checkError(e: AbstractControl | null) {
    return e?.errors && (e?.touched || e?.dirty);
  }
  ngOnDestroy(): void {
    this.signInSub?.unsubscribe();
  }
}
