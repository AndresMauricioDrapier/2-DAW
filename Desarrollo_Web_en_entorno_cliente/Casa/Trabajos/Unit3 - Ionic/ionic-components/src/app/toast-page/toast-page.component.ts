import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-toast-page',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './toast-page.component.html',
  styleUrls: ['./toast-page.component.scss'],
})
export class ToastPageComponent implements OnInit {

  constructor(public toastCtrl: ToastController) {}

  async showToast() {
    const toast = await this.toastCtrl.create({
      message: 'I\'m a toast message',
      duration: 5000, // 5 seconds
      position: 'bottom',
      color: 'danger',
      buttons: [
        {
          // text: ' Close',
          icon: 'close-circle',
          role: 'cancel'
          // handler:  () => {
          //   toast.dismiss();
          // }
        }
      ]
    });
    await toast.present();
    // Code after the toast is closed
  }

  ngOnInit() {}

}
