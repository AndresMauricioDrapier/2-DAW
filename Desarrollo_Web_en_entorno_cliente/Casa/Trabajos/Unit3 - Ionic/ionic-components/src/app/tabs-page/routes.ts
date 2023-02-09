import { Routes } from "@angular/router";

export const TABS_ROUTES: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./home-page/home-page.component').then(m => m.HomePageComponent)
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./about-page/about-page.component').then(m => m.AboutPageComponent)
  },
  {
    path: 'contacts',
    loadComponent: () =>
      import('./contacts-page/contacts-page.component').then(m => m.ContactsPageComponent)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  }
];
