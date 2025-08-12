import { Component } from '@angular/core';

import { CategoriesSliderComponent } from '../categories-slider/categories-slider.component';
import { MainSliderComponent } from '../main-slider/main-slider.component';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-home',
  imports: [MainSliderComponent, CategoriesSliderComponent, ProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
