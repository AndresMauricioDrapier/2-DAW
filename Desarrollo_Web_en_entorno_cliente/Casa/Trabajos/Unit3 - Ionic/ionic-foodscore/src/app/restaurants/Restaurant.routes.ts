import { Routes } from '@angular/router';
import { restaurantResolve } from './resolvers/restaurant.resolver';
import { RestaurantsPageComponent } from './restaurants-page/restaurants-page.component';

export const APP_ROUTES: Routes = [
  { path: '', component: RestaurantsPageComponent },
  {
    path: 'add',
    loadComponent: () =>
      import('./restaurant-form/restaurant-form.component').then(
        (m) => m.RestaurantFormComponent
      ),
  },
  {
    path: "edit/:id",
    loadComponent: () =>
        import("./restaurant-form/restaurant-form.component").then(
            (m) => m.RestaurantFormComponent
        ),
    resolve: {
        restaurant: restaurantResolve,
    },
},
  {
    path: ':id',
    loadComponent: () =>
      import('./restaurant-details/restaurant-details.component').then(
        (m) => m.RestaurantDetailsComponent
      ),
    loadChildren: () =>
      import('./restaurant-details/restaurant-details.routes').then((m) => m.APP_ROUTES),
  },


];
