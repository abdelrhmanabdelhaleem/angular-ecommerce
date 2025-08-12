import {
  Component,
  DestroyRef,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { LoadingService } from '../../core/services/loading.service';

@Component({
  selector: 'app-nav-blank',
  imports: [RouterModule],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.css',
})
export class NavBlankComponent {
  authService = inject(AuthService);
  cartService = inject(CartService);
  destroyRef = inject(DestroyRef);
  loadingService = inject(LoadingService);
  countNumber: WritableSignal<number | null> = signal(null);
  ngOnInit(): void {
    this.cartService
      .getCart()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.cartService.cartCount$.next(res.numOfCartItems);
        },
      });
    this.cartService.cartCount$.subscribe({
      next: (num) => {
        this.countNumber.set(num);
      },
    });
  }
}
