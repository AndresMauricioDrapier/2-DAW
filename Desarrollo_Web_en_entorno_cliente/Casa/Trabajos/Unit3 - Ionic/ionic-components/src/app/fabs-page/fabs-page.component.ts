import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-fabs-page',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './fabs-page.component.html',
  styleUrls: ['./fabs-page.component.scss'],
})
export class FabsPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
