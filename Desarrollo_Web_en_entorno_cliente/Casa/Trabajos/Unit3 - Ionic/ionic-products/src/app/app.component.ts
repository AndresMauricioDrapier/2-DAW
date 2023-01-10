import { CommonModule } from '@angular/common';
import { Component, EnvironmentInjector } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {RouterLink} from '@angular/router'
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink],

  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages: { title: string; url: string; icon: string }[] = [
    { title: 'Products', url: '/products', icon: 'home' },
  ];
  constructor(public environmentInjector: EnvironmentInjector) {}
}
