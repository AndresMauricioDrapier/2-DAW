import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HammerModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-gestures-page',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './gestures-page.component.html',
  styleUrls: ['./gestures-page.component.scss'],
})
export class GesturesPageComponent implements OnInit {

  events = {
    taps: 0,
    press: 0,
    swipeRight: 0,
    swipeLeft: 0,
  };

  constructor() { }

  tap() {
    this.events.taps++;
  }

  press() {
    this.events.press++;
  }

  swipeLeft() {
    this.events.swipeLeft++;
  }

  swipeRight() {
    this.events.swipeRight++;
  }


  ngOnInit() {
  }

}
