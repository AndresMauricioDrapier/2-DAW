import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {RouterLink} from '@angular/router'
import { EnvironmentInjector } from '@ionic/angular/di/r3_injector';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink],

  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages: { title: string; url: string; icon: string }[] = [];
  constructor(public environmentInjector: EnvironmentInjector) {}
}
