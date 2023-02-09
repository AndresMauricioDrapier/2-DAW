import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-toolbar-page',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './toolbar-page.component.html',
  styleUrls: ['./toolbar-page.component.scss'],
})
export class ToolbarPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
