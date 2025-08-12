import { Component, inject, signal, WritableSignal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription, throttleTime } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { LoadingService } from '../../core/services/loading.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  authService = inject(AuthService);
  router = inject(Router);
  formBuilder = inject(FormBuilder);
  loadingService = inject(LoadingService);
  signUpSub: WritableSignal<Subscription> = signal(new Subscription());
  isLoading: WritableSignal<boolean> = signal(false);
  registerForm: FormGroup = this.formBuilder.group(
    {
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^\w{6,}$/)]],
      rePassword: [''],
      phone: [
        '',
        [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
      ],
    },
    { validators: this.confirmPassword }
  );
  registerSubmit() {
    if (this.registerForm.valid) {
      this.authService
        .signUp(this.registerForm.value)
        .pipe(throttleTime(3000))
        .subscribe({
          next: (res) => {
            if (res.message == 'success') {
              this.router.navigate(['/login']);
            }
          },
        });
    } else {
      this.registerForm.markAllAsTouched();
      this.registerForm.setErrors({ misMatch: true });
    }
  }
  checkError(e: AbstractControl | null) {
    return e?.errors && (e?.touched || e?.dirty);
  }
  confirmPassword(g: AbstractControl) {
    if (g.get('password')?.value == g.get('rePassword')?.value) {
      return null;
    } else {
      return { misMatch: true };
    }
  }
  ngOnDestroy(): void {
    this.signUpSub()?.unsubscribe();
  }
}
