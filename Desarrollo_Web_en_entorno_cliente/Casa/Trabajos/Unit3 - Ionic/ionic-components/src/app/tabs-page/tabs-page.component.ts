import { CommonModule } from '@angular/common';
import { Component, EnvironmentInjector, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-tabs-page',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './tabs-page.component.html',
  styleUrls: ['./tabs-page.component.scss'],
})
export class TabsPageComponent implements OnInit {

  constructor(public environmentInjector: EnvironmentInjector) { }

  ngOnInit() {}

}
