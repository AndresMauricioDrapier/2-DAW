import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-loading-page',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './loading-page.component.html',
  styleUrls: ['./loading-page.component.scss'],
})
export class LoadingPageComponent implements OnInit {
  loading!: HTMLIonLoadingElement;
  data!: string;

  constructor(private loadingCtrl: LoadingController) { }

  async ionViewWillEnter() {
    this.loading = await this.loadingCtrl.create({
      message: 'Loading data',
      spinner: 'bubbles',
      cssClass: 'primary'
    });
    await this.loading.present();

    // Simulate a server call
    setTimeout(() => {
      this.data = 'Data loaded';
      this.loading.dismiss();
    }, 2000);
  }

  ngOnInit() {}

}
