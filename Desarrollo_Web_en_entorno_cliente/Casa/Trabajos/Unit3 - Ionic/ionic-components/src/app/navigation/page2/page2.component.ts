import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';

@Component({
  selector: 'app-page2',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink],
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.scss'],
})
export class Page2Component implements OnInit {
  constructor(private navController: NavController) { }

  ngOnInit() {
    console.log("Page 2 loaded");
  }

  goToPage1() {
    // this.navController.navigateBack(['/navigation1']);
    this.navController.back();
  }
}
