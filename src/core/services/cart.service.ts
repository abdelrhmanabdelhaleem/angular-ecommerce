import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private httpClient: HttpClient) {}
  cartCount$: BehaviorSubject<number> = new BehaviorSubject(0);
  getCart(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/cart`);
  }

  addProductToCart(productId: string | undefined): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/cart`, {
      productId,
    });
  }
  removeProductFormCart(productId: string): Observable<any> {
    return this.httpClient.delete(
      `${environment.baseUrl}/api/v1/cart/${productId}`
    );
  }
  updateProductFormCart(productId: string, count: number): Observable<any> {
    return this.httpClient.put(
      `${environment.baseUrl}/api/v1/cart/${productId}`,
      { count }
    );
  }
  removeCart(): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart`);
  }
}
