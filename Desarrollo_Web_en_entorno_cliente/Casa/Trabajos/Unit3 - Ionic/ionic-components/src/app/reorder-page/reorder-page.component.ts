import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, IonReorderGroup } from '@ionic/angular';

@Component({
  selector: 'app-reorder-page',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './reorder-page.component.html',
  styleUrls: ['./reorder-page.component.scss'],
})
export class ReorderPageComponent implements OnInit {
  foods: string[] = [
    'Pizza', 'Banana', 'Hamburguer', 'Soup', 'Steak', 'Apple'
  ];
  disableOrdering = true;

  constructor() { }

  ngOnInit() {
  }

  reorder(event: any) {
    const elemFrom = this.foods.splice(event.detail.from, 1);
    this.foods.splice(event.detail.to, 0, elemFrom[0]);
    console.log(this.foods);
    event.detail.complete();
  }

  toggleReordering() {
    this.disableOrdering = !this.disableOrdering;
  }
}
