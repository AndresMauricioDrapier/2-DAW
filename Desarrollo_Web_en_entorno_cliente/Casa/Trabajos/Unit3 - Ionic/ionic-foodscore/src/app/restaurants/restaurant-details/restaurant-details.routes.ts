import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: 'detail',
    loadComponent: () =>
      import('./restaurant-detail/restaurant-detail.component').then(
        (m) => m.RestaurantDetailComponent
      ),
  },
  // {
  //   path: 'comments',
  //   loadComponent: () =>
  //     import('./product-comments/product-comments.component').then(
  //       (m) => m.ProductCommentsComponent
  //     ),
  // },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'detail',
  },
];
