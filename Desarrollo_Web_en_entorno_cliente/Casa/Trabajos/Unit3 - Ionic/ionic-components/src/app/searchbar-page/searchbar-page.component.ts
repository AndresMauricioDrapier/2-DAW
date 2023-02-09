import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-searchbar-page',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './searchbar-page.component.html',
  styleUrls: ['./searchbar-page.component.scss'],
})
export class SearchbarPageComponent implements OnInit {
  items = [
    'Banana',
    'Apple',
    'Pineapple',
    'Orange',
    'Melon',
    'Watermelon',
    'Peach',
    'Strawberry',
    'Gooseberry',
    'Blackberry',
    'Blueberry'
  ];
  filteredItems!: string[];
  search = '';

  constructor() { }

  ngOnInit() {
    this.filteredItems = this.items;
  }

  filterItems() {
    if (this.search && this.search.trim() !== '') {
      this.search = this.search.trim().toLowerCase();
      this.filteredItems = this.items.filter(i =>
        i.toLowerCase().includes(this.search)
      );
    } else {
      this.filteredItems = this.items;
    }
  }
}
