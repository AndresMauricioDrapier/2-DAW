import { CommonModule } from '@angular/common';
import { Component, EnvironmentInjector } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink],
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Action sheet', url: '/action-sheet', icon: 'menu' },
    { title: 'Alert', url: '/alert', icon: 'alert' },
    {
      title: 'Badges/Chips',
      url: '/badges',
      icon: 'square',
    },
    { title: 'Buttons', url: '/buttons', icon: 'apps' },
    { title: 'Cards', url: '/cards', icon: 'albums' },
    { title: 'Checkbox/Radio', url: '/checkbox', icon: 'checkbox' },
    { title: 'Fabs', url: '/fabs', icon: 'add-circle' },
    {
      title: 'Gestures',
      url: '/gestures',
      icon: 'finger-print',
    },
    { title: 'Grid', url: '/grid', icon: 'grid' },
    {
      title: 'Horizontal Scroll',
      url: '/horizontal-scroll',
      icon: 'swap-horizontal',
    },
    { title: 'Inputs', url: '/inputs', icon: 'text' },
    {
      title: 'Infinite Scroll',
      url: '/infinite-scroll',
      icon: 'infinite',
    },
    { title: 'Lists', url: '/list', icon: 'list' },
    {
      title: 'Loading',
      url: '/loading',
      icon: 'refresh',
    },
    {
      title: 'Modal',
      url: '/modal',
      icon: 'albums',
    },
    {
      title: 'Navigation',
      url: '/navigation1',
      icon: 'arrow-forward-circle',
    },
    {
      title: 'Popover',
      url: '/popover',
      icon: 'albums',
    },
    {
      title: 'Range',
      url: '/range',
      icon: 'pin',
    },
    {
      title: 'Refresher',
      url: '/refresher',
      icon: 'refresh-circle',
    },
    {
      title: 'Reorder',
      url: '/reorder',
      icon: 'reorder-three',
    },
    {
      title: 'Searchbar',
      url: '/searchbar',
      icon: 'search',
    },
    {
      title: 'Segments',
      url: '/segments',
      icon: 'bookmarks',
    },
    {
      title: 'Select',
      url: '/select',
      icon: 'checkbox',
    },
    {
      title: 'Skeleton',
      url: '/skeleton',
      icon: 'list',
    },
    {
      title: 'Slides',
      url: '/slides',
      icon: 'images',
    },
    {
      title: 'Tabs',
      url: '/tabs',
      icon: 'copy',
    },
    { title: 'Toast', url: '/toast', icon: 'alert' },
    {
      title: 'Toolbars',
      url: '/toolbar',
      icon: 'browsers',
    },
    {
      title: 'Virtual Scroll',
      url: '/virtual-scroll',
      icon: 'layers',
    },
  ];
  constructor(public environmentInjector: EnvironmentInjector) {}
}
