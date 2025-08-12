import { CurrencyPipe } from '@angular/common';
import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  InputSignal,
  signal,
  WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { IProduct } from '../../core/interfaces/product';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { CartService } from '../../core/services/cart.service';
import { ProductsService } from '../../core/services/products.service';

@Component({
  selector: 'app-products',
  imports: [CurrencyPipe, RouterLink, FormsModule, SearchPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  productsService = inject(ProductsService);
  cartService = inject(CartService);
  toastrService = inject(ToastrService);
  destroyRef = inject(DestroyRef);
  productsList: WritableSignal<IProduct[]> = signal([]);
  getProductsSub!: Subscription;
  slice: InputSignal<boolean | undefined> = input<boolean>();
  text: string = '';

  displayedProducts = computed(() => {
    return this.slice()
      ? this.productsList().slice(10, 22)
      : this.productsList();
  });
  ngOnInit(): void {
    this.getProductsSub = this.productsService.getProducts().subscribe({
      next: (res) => {
        this.productsList.set(res.data);
      },
    });
  }
  addCart(id: string) {
    this.cartService
      .addProductToCart(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          if ((res.status = 'success')) {
            this.toastrService.success(res.message);
            this.cartService.cartCount$.next(res.numOfCartItems);
          }
        },
      });
  }
  ngOnDestroy(): void {
    this.getProductsSub?.unsubscribe();
  }
}
