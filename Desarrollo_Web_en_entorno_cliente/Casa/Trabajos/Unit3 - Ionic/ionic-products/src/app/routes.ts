import { Routes } from '@angular/router';
export const APP_ROUTES: Routes = [
  {
    path: 'products',
    loadComponent: () =>
      import('./products/products.component').then((m) => m.ProductsComponent),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/products',
  },
];
