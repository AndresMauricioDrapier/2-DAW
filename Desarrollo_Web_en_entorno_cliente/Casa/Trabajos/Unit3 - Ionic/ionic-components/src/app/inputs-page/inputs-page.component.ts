import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-inputs-page',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './inputs-page.component.html',
  styleUrls: ['./inputs-page.component.scss'],
})
export class InputsPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
