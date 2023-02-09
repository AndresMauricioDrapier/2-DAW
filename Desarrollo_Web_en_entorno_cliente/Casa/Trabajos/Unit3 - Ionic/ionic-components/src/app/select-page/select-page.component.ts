import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-select-page',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './select-page.component.html',
  styleUrls: ['./select-page.component.scss'],
})
export class SelectPageComponent implements OnInit {
  selectedConsoles: string[] = [];
  consoles: {val: string, title: string}[] = [
    {val: 'nes', title: 'NES'},
    {val: 'n64', title: 'Nintendo64'},
    {val: 'ps', title: 'Playstation'},
    {val: 'md', title: 'Mega Drive'},
    {val: 'saturn', title: 'Saturn'},
    {val: 'snes', title: 'SNES'},
  ];

  constructor() { }

  ngOnInit() {}

}
