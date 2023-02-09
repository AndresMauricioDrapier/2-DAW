import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-grid-page',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './grid-page.component.html',
  styleUrls: ['./grid-page.component.scss'],
})
export class GridPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
