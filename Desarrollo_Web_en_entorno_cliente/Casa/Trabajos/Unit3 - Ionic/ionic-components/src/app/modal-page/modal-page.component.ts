import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { ModalContentComponent } from './modal-content/modal-content.component';

@Component({
  selector: 'app-modal-page',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './modal-page.component.html',
  styleUrls: ['./modal-page.component.scss'],
})
export class ModalPageComponent implements OnInit {
  name = '';
  food = '';

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ModalContentComponent,
      componentProps: { name: this.name }
    });
    await modal.present();
    const result = await modal.onDidDismiss();
    if (result.data && result.data.food) {
      this.food = result.data.food;
    }
  }

}
