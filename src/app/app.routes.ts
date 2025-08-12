import { Routes } from '@angular/router';
import { DetailsComponent } from '../components/details/details.component';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { NotfoundComponent } from '../components/notfound/notfound.component';
import { ProductsComponent } from '../components/products/products.component';
import { RegisterComponent } from '../components/register/register.component';
import { WishlistComponent } from '../components/wishlist/wishlist.component';
import { authGuard } from '../core/guard/auth.guard';
import { loggedGuard } from '../core/guard/logged.guard';
import { AuthLayoutComponent } from '../layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from '../layouts/blank-layout/blank-layout.component';
import { CartComponent } from './../components/cart/cart.component';
import { CategoriesComponent } from './../components/categories/categories.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [loggedGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
  {
    path: '',
    component: BlankLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'details/:id',
        component: DetailsComponent,
      },
      {
        path: 'categories',
        component: CategoriesComponent,
      },
      {
        path: 'cart',
        component: CartComponent,
      },
      {
        path: 'wishlist',
        component: WishlistComponent,
      },
      {
        path: '**',
        component: NotfoundComponent,
      },
    ],
  },
];
