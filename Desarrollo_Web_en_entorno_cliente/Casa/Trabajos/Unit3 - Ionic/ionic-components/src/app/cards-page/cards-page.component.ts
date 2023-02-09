import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-cards-page',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './cards-page.component.html',
  styleUrls: ['./cards-page.component.scss'],
})
export class CardsPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
