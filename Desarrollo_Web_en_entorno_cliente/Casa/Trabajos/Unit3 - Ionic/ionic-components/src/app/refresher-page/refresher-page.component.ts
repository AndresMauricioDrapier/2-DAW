import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, IonRefresher } from '@ionic/angular';

@Component({
  selector: 'app-refresher-page',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './refresher-page.component.html',
  styleUrls: ['./refresher-page.component.scss'],
})
export class RefresherPageComponent implements OnInit {
  items = [1, 2, 3, 4, 5];

  constructor() { }

  ngOnInit() {
    this.update();
  }

  update() {
    this.items = this.items.map(n => Math.round(Math.random() * 99 + 1));
  }

  refresh(refresher: IonRefresher) {
    setTimeout(() => {
      this.update();
      refresher.complete();
    }, 2000);
  }
}
