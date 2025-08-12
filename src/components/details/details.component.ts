import { CurrencyPipe } from '@angular/common';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { IProduct } from '../../core/interfaces/product';
import { CartService } from '../../core/services/cart.service';
import { ProductsService } from '../../core/services/products.service';

@Component({
  selector: 'app-details',
  imports: [CurrencyPipe, CarouselModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  activatedRoute = inject(ActivatedRoute);
  productsService = inject(ProductsService);
  cartService = inject(CartService);
  productID: WritableSignal<string | null> = signal(null);
  productDetails: WritableSignal<IProduct | null> = signal(null);
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (p) => {
        this.productID.set(p.get('id'));
      },
    });
    this.productsService.specificProduct(this.productID()).subscribe({
      next: (res) => {
        this.productDetails.set(res.data);
      },
    });
  }
  customOptionsCategories: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 900,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 3000,
    navText: ['', ''],
    items: 1,
    nav: true,
  };
  addCart(id: string | undefined) {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log('🚀 ~ ProductsComponent ~ addCart ~ res:', res);
      },
    });
  }
}
