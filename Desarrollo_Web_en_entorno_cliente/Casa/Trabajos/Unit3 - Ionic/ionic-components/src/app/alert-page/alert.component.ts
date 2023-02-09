import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlertController, IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  resp!: string;
  foods!: string;
  email!: string;
  pass!: string;

  constructor(private alertCtrl: AlertController) {}

  ngOnInit() {}

  async showAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Hello alert',
      subHeader: 'This is a simple alert',
      message: 'See the official documentation for more examples',
      buttons: [
        {
          text: 'Ok',
          handler: () => ({ ok: true }),
        },
        {
          text: 'Cancel',
          role: 'cancel'
        },
      ],
    });

    await alert.present();

    const resp = await alert.onDidDismiss();
    // resp.data === undefined -> Cancelled
    // resp.role === 'cancel' -> Cancelled
    this.resp = resp.data && resp.data.ok ? 'You said Ok!' : 'You cancelled...';
  }

  async showAlert2() {
    const alert = await this.alertCtrl.create({
      header: 'Select an option',
      inputs: [
        {
          name: 'pizza',
          type: 'checkbox',
          value: 'pizza',
          label: 'Pizza',
        },
        {
          name: 'hamburguer',
          type: 'checkbox',
          value: 'hamburguer',
          label: 'Hamburguer',
        },
        {
          name: 'spaghetti',
          type: 'checkbox',
          value: 'spaghetti',
          label: 'Spaghetti',
        },
        {
          name: 'chicken',
          type: 'checkbox',
          value: 'chicken',
          label: 'Chicken',
        },
      ],
      buttons: ['Ok', 'Cancel'],
    });

    await alert.present();

    const resp = await alert.onDidDismiss();
    if (resp.data && resp.role !== 'cancel') { // There's a response!
      console.log(resp.data.values);
      this.foods = resp.data.values.toString();
    }
  }

  async showAlert3() {
    const alert = await this.alertCtrl.create({
      header: 'Login',
      subHeader: 'Enter email and password',
      inputs: [
        {
          type: 'text',
          name: 'email',
          placeholder: 'Email',
        },
        {
          type: 'password',
          name: 'pass',
          placeholder: 'Password',
        },
      ],
      buttons: ['Login', 'Cancel'],
    });

    await alert.present();

    const result = await alert.onDidDismiss();
    if (result.data && result.role !== 'cancel') {
      console.log(result.data);
      this.email = result.data.values.email;
      this.pass = result.data.values.pass;
    }
  }
}
