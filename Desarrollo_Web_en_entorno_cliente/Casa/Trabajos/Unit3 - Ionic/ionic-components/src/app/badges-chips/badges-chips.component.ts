import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-badges-chips',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './badges-chips.component.html',
  styleUrls: ['./badges-chips.component.scss'],
})
export class BadgesChipsComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
