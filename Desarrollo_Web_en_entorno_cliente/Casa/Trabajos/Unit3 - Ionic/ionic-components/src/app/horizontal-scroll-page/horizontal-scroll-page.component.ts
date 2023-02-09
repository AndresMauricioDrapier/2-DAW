import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-horizontal-scroll-page',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './horizontal-scroll-page.component.html',
  styleUrls: ['./horizontal-scroll-page.component.scss'],
})
export class HorizontalScrollPageComponent implements OnInit {
  icons: string[] = [
    'alert', 'albums', 'alarm', 'analytics', 'logo-angular', 'logo-apple',
    'logo-nodejs', 'archive', 'at', 'baseball', 'basket', 'battery-charging',
    'beer', 'bicycle', 'logo-bitcoin', 'boat', 'logo-tux'
  ];

  constructor() { }

  ngOnInit() {}

}
