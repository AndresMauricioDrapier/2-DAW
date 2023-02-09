import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-input-radio-page',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './input-radio-page.component.html',
  styleUrls: ['./input-radio-page.component.scss'],
})
export class InputRadioPageComponent implements OnInit {
  sausage = false;
  mushrooms = true;
  relationship = 'friends';

  constructor() { }

  ngOnInit() {}

}
