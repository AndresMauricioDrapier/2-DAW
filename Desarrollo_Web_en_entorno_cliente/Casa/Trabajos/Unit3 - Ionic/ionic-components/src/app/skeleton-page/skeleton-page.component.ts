import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-skeleton-page',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './skeleton-page.component.html',
  styleUrls: ['./skeleton-page.component.scss'],
})
export class SkeletonPageComponent implements OnInit {
  data = false;

  constructor() { }

  ngOnInit() {
    setTimeout(() => this.data = true, 3000);
  }
}
