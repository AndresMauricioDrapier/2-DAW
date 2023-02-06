import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: 'detail',
    loadComponent: () =>
      import('./restaurant-detail/restaurant-detail.component').then(
        (m) => m.RestaurantDetailComponent
      ),
  },
  {
    path: 'comments',
    loadComponent: () =>
      import('./restaurant-comments/restaurant-comments.component').then(
        (m) => m.RestaurantCommentsComponent
      ),
  },
  {
    path: 'location',
    loadComponent: () =>
      import('./restaurant-location/restaurant-location.component').then(
        (m) => m.RestaurantLocationComponent
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'detail',
  },
];
