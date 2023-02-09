import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(private navController: NavController) { }

  ngOnInit() {
  }

  goAbout() {
    this.navController.navigateRoot(['/tabs', 'about']);
  }

  goButtons() {
    this.navController.navigateRoot(['/buttons']);
  }

}
