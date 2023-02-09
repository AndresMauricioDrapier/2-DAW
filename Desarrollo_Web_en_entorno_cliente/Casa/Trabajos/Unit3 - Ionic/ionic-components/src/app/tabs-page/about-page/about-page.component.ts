import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss'],
})
export class AboutPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
