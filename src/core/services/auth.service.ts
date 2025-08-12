import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import {
  IAuthResponse,
  ILogin,
  IRegister,
  IUserDecodedToken,
} from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private router = inject(Router);
  private toastrService = inject(ToastrService);
  userData: WritableSignal<null | IUserDecodedToken> = signal(null);
  signUp(value: IRegister): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}/api/v1/auth/signup`,
      value
    );
  }
  signIn(value: ILogin): Observable<IAuthResponse> {
    return this.httpClient.post<IAuthResponse>(
      `${environment.baseUrl}/api/v1/auth/signin`,
      value
    );
  }
  saveUserData() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedUser = jwtDecode<IUserDecodedToken>(token);

        this.userData.set(decodedUser);
      } catch (err) {
        this.userData.set(null);
        this.toastrService.error('Invalid Token');
      }
    }
  }
  logOut() {
    localStorage.removeItem('token');
    this.userData.set(null);
    this.router.navigate(['login']);
  }
}
