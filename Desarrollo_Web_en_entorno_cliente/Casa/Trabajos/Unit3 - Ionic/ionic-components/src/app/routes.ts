import { Routes } from '@angular/router';
export const APP_ROUTES: Routes = [
  {
    path: 'badges',
    loadComponent: () =>
      import('./badges-chips/badges-chips.component').then(
        (m) => m.BadgesChipsComponent
      ),
  },
  {
    path: 'buttons',
    loadComponent: () =>
      import('./buttons-page/buttons-page.component').then(
        (m) => m.ButtonsPageComponent
      ),
  },
  {
    path: 'checkbox',
    loadComponent: () =>
      import('./checkbox-radio-page/input-radio-page.component').then(
        (m) => m.InputRadioPageComponent
      ),
  },
  {
    path: 'list',
    loadComponent: () =>
      import('./list-page/list-page.component').then(
        (m) => m.ListPageComponent
      ),
  },
  {
    path: 'inputs',
    loadComponent: () =>
      import('./inputs-page/inputs-page.component').then(
        (m) => m.InputsPageComponent
      ),
  },
  {
    path: 'cards',
    loadComponent: () =>
      import('./cards-page/cards-page.component').then(
        (m) => m.CardsPageComponent
      ),
  },
  {
    path: 'toast',
    loadComponent: () =>
      import('./toast-page/toast-page.component').then(
        (m) => m.ToastPageComponent
      ),
  },
  {
    path: 'alert',
    loadComponent: () =>
      import('./alert-page/alert.component').then(
        (m) => m.AlertComponent
      ),
  },
  {
    path: 'action-sheet',
    loadComponent: () =>
      import('./action-sheet-page/action-sheet-page.component').then(
        (m) => m.ActionSheetPageComponent
      ),
  },
  {
    path: 'fabs',
    loadComponent: () =>
      import('./fabs-page/fabs-page.component').then(
        (m) => m.FabsPageComponent
      ),
  },
  {
    path: 'grid',
    loadComponent: () =>
      import('./grid-page/grid-page.component').then(
        (m) => m.GridPageComponent
      ),
  },
  {
    path: 'horizontal-scroll',
    loadComponent: () =>
      import('./horizontal-scroll-page/horizontal-scroll-page.component').then(
        (m) => m.HorizontalScrollPageComponent
      ),
  },
  {
    path: 'loading',
    loadComponent: () =>
      import('./loading-page/loading-page.component').then(
        (m) => m.LoadingPageComponent
      ),
  },
  {
    path: 'popover',
    loadComponent: () =>
      import('./popover-page/popover-page.component').then(
        (m) => m.PopoverPageComponent
      ),
  },
  {
    path: 'range',
    loadComponent: () =>
      import('./range-page/range-page.component').then(
        (m) => m.RangePageComponent
      ),
  },
  {
    path: 'refresher',
    loadComponent: () =>
      import('./refresher-page/refresher-page.component').then(
        (m) => m.RefresherPageComponent
      ),
  },
  {
    path: 'infinite-scroll',
    loadComponent: () =>
      import('./infinite-scroll-page/infinite-scroll-page.component').then(
        (m) => m.InfiniteScrollPageComponent
      ),
  },
  {
    path: 'searchbar',
    loadComponent: () =>
      import('./searchbar-page/searchbar-page.component').then(
        (m) => m.SearchbarPageComponent
      ),
  },
  {
    path: 'reorder',
    loadComponent: () =>
      import('./reorder-page/reorder-page.component').then(
        (m) => m.ReorderPageComponent
      ),
  },
  {
    path: 'segments',
    loadComponent: () =>
      import('./segments-page/segments-page.component').then(
        (m) => m.SegmentsPageComponent
      ),
  },
  {
    path: 'select',
    loadComponent: () =>
      import('./select-page/select-page.component').then(
        (m) => m.SelectPageComponent
      ),
  },
  {
    path: 'slides',
    loadComponent: () =>
      import('./slides-page/slides-page.component').then(
        (m) => m.SlidesPageComponent
      ),
  },
  {
    path: 'toolbar',
    loadComponent: () =>
      import('./toolbar-page/toolbar-page.component').then(
        (m) => m.ToolbarPageComponent
      ),
  },
  {
    path: 'virtual-scroll',
    loadComponent: () =>
      import('./virtual-scroll-page/virtual-scroll-page.component').then(
        (m) => m.VirtualScrollPageComponent
      ),
  },
  {
    path: 'gestures',
    loadComponent: () =>
      import('./gestures-page/gestures-page.component').then(
        (m) => m.GesturesPageComponent
      ),
  },
  {
    path: 'skeleton',
    loadComponent: () =>
      import('./skeleton-page/skeleton-page.component').then(
        (m) => m.SkeletonPageComponent
      ),
  },
  {
    path: 'modal',
    loadComponent: () =>
      import('./modal-page/modal-page.component').then(
        (m) => m.ModalPageComponent
      ),
  },
  {
    path: 'navigation1',
    loadComponent: () =>
      import('./navigation/page1/page1.component').then(
        (m) => m.Page1Component
      ),
  },
  {
    path: 'navigation2',
    loadComponent: () =>
      import('./navigation/page2/page2.component').then(
        (m) => m.Page2Component
      ),
  },
  {
    path: 'tabs',
    loadComponent: () =>
      import('./tabs-page/tabs-page.component').then(
        (m) => m.TabsPageComponent
      ),
    loadChildren: () => import('./tabs-page/routes').then(m => m.TABS_ROUTES)
  },
  {
    path: '',
    redirectTo: '/buttons',
    pathMatch: 'full'
  }
];
