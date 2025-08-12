import { CurrencyPipe } from '@angular/common';
import {
  Component,
  DestroyRef,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ICart } from '../../core/interfaces/icart';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartService = inject(CartService);
  destroyRef = inject(DestroyRef);
  toastrService = inject(ToastrService);
  productSCart: WritableSignal<ICart | null> = signal(null);
  ngOnInit(): void {
    this.cartService
      .getCart()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.productSCart.set(res.data);
        },
      });
  }
  removeItem(id: string) {
    this.cartService
      .removeProductFormCart(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.productSCart.set(res.data);
          this.toastrService.error('Remove Product From Cart');
          this.cartService.cartCount$.next(res.numOfCartItems);
        },
      });
  }
  removeItems() {
    this.cartService
      .removeCart()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.productSCart.set(null);
          this.toastrService.success(' success remove Cart');
          this.cartService.cartCount$.next(0);
        },
      });
  }
  updateQuantity(id: string, count: number) {
    if (count > 1) {
      this.cartService
        .updateProductFormCart(id, count)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (res) => {
            this.productSCart.set(res.data);
          },
        });
    }
  }
}
