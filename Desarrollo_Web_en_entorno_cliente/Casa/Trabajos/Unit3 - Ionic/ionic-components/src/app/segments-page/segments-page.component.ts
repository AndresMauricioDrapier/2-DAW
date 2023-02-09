import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-segments-page',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './segments-page.component.html',
  styleUrls: ['./segments-page.component.scss'],
})
export class SegmentsPageComponent implements OnInit {
  type = 'heroes';
  heroes: string[] = ['Batman', 'Superman', 'Spiderman', 'Hulk', 'Mazinger Z'];
  villains: string[] = ['Dr Eggman', 'The Joker', 'Darth Vader', 'Hannibal Lecter'];
  weapons: string[] = ['Missile', 'Laser gun', 'Tank', 'X Rays'];

  constructor() { }

  ngOnInit() {
  }

  typeChanged() {
    console.log(`New type selected: ${this.type}`);
  }
}
