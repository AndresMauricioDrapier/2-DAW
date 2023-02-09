import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';

@Component({
  selector: 'app-page1',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink],
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.scss'],
})
export class Page1Component implements OnInit {
  constructor(private navController: NavController) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    console.log("Page 1 loaded");
  }

  goToPage2() {
    this.navController.navigateForward(['/navigation2']);
  }

}
