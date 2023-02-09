import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-infinite-scroll-page',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './infinite-scroll-page.component.html',
  styleUrls: ['./infinite-scroll-page.component.scss'],
})
export class InfiniteScrollPageComponent implements OnInit {
  items: String[] = [];
  num = 1;
  finished = false;

  constructor() { }

  ngOnInit() {
    this.loadMoreItems();
  }

  loadMoreItems(infinite?: IonInfiniteScroll) {
    // Simulating an external service call with a timeout
    setTimeout(() => {
      const max = this.num + 15;
      for (; this.num < max; this.num++) {
        this.items.push('Item ' + this.num);
      }
      if (this.num >= 120) { // We'll load a maximum of 60 items
        this.finished = true;
      }

      infinite?.complete(); // Hide the loader (if not undefined)
    }, infinite ? 2000 : 0);
  }
}
