import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-range-page',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './range-page.component.html',
  styleUrls: ['./range-page.component.scss'],
})
export class RangePageComponent implements OnInit {
  range1 = 50;
  dualRange = {
    lower: 20,
    upper: 70
  };

  constructor() { }

  ngOnInit() {}

}
