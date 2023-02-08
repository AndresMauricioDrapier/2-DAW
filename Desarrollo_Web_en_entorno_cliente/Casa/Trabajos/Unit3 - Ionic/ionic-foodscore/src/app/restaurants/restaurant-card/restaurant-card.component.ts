import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Restaurant } from '../interfaces/restaurant';
import { RestaurantService } from '../services/restaurant.service';
import { RouterModule } from '@angular/router';
import { OPENDAYS } from 'src/app/shared/consts';
import {
  AlertController,
  IonicModule,
  NavController,
  ToastController,
} from '@ionic/angular';
import { StarRatingComponent } from 'src/app/shared/star-rating/star-rating.component';
import { waitForAsync } from '@angular/core/testing';

@Component({
  selector: 'fs-restaurant-card',
  standalone: true,
  imports: [CommonModule, RouterModule, IonicModule, StarRatingComponent],
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.css'],
})
export class RestaurantCardComponent implements OnChanges {
  @Input() restaurant!: Restaurant;
  constructor(
    private readonly http: RestaurantService,
    private readonly navController: NavController,
    private readonly alertController: AlertController,
    private readonly toastController: ToastController
  ) {}

  ngOnChanges(): void {
    if (this.restaurant) this.daysOpenString();
  }
  goRestaurant() {
    this.navController.navigateForward(['/restaurants', this.restaurant.id]);
  }

  daysOpenString(): void {
    for (let i = 0; i < this.restaurant.daysOpen.length; i++) {
      switch (this.restaurant.daysOpen[i]) {
        case '0':
        case 'Su':
          this.restaurant.daysOpen[i] = OPENDAYS[0];
          break;
        case '1':
        case 'Mo':
          this.restaurant.daysOpen[i] = OPENDAYS[1];
          break;
        case '2':
        case 'Tu':
          this.restaurant.daysOpen[i] = OPENDAYS[2];
          break;
        case '3':
        case 'We':
          this.restaurant.daysOpen[i] = OPENDAYS[3];
          break;
        case '4':
        case 'Th':
          this.restaurant.daysOpen[i] = OPENDAYS[4];
          break;
        case '5':
        case 'Fr':
          this.restaurant.daysOpen[i] = OPENDAYS[5];
          break;
        case '6':
        case 'Sa':
          this.restaurant.daysOpen[i] = OPENDAYS[6];
          break;
      }
    }
  }

  openOrClosed(day: string[]): boolean {
    if (day.includes(OPENDAYS[new Date().getDay()])) {
      return true;
    } else {
      return false;
    }
  }
  async presentAlert(): Promise<HTMLIonAlertElement> {
    const alert = await this.alertController.create({
      header: 'Are you sure?',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'alert-button-cancel',

        },
        {
          text: 'Yes',
          role: 'confirm',
          cssClass: 'alert-button-confirm',
        },
      ],
    });

    return alert;
  }
  async presentToast() {}

  deleteRestaurant(): void {
    this.presentAlert().then(async (a) => {
      await a.present();

      if ((await a.onDidDismiss()).role =="cancel") {

        const toast = await this.toastController.create({
          message: 'The restaurant has not been deleted',
          duration: 3000,
          cssClass: 'custom-toast',
          buttons: [
            {
              text: 'Dismiss',
              role: 'cancel',
            },
          ],
        });

        await toast.present();
      } else {
        const toast = await this.toastController.create({
          message: 'The restaurant has been successfully deleted',
          duration: 3000,
          cssClass: 'custom-toast',
          buttons: [
            {
              text: 'Dismiss',
              role: 'cancel',
            },
          ],
        });
        await toast.present().then(() => {
          this.http.deleteRestaurant(this.restaurant.id!).subscribe(() => {
            window.location.reload();
          });
        });
      }
    });
  }
}
