import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-buttons-page',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './buttons-page.component.html',
  styleUrls: ['./buttons-page.component.scss'],
})
export class ButtonsPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
