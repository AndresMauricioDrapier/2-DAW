import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
})
export class ListPageComponent implements OnInit {
  itemList = ['Sliding 1', 'Sliding 2', 'Sliding 3'];

  constructor() {}

  ngOnInit() {}

  close(slidingItem: IonItemSliding) {
    slidingItem.close();
  }

  showRightOptions(slidingItem: IonItemSliding) {
    slidingItem.open('end');
  }
}
