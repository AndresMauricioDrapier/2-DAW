import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-content',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss'],
})
export class ModalContentComponent implements OnInit {
  @Input() name!: string;
  food = 'pizza';

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {}

  chooseFood() {
    this.modalCtrl.dismiss({food: this.food});
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
