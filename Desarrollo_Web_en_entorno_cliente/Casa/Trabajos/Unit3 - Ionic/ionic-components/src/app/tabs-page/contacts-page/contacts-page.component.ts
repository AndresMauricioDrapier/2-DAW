import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-contacts-page',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.scss'],
})
export class ContactsPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
