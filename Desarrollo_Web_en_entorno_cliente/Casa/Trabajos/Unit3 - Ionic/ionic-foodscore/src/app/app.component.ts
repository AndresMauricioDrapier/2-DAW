import { CommonModule } from '@angular/common';
import { Component, EnvironmentInjector } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  ActionPerformed,
  PushNotifications,
  PushNotificationSchema,
} from '@capacitor/push-notifications';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { IonicModule, NavController, Platform, ToastController } from '@ionic/angular';
import { AuthService } from './auth/services/auth.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink,RouterLinkActive],
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  menuDisabled = true;

  public appPages = [
    {
      title: 'Profile',
      url: '/profile',
      icon: 'person-circle',
    },
    {
      title: 'Restaurants',
      url: '/restaurants',
      icon: 'restaurant',
    },
    {
      title: 'Add restaurant',
      url: '/restaurants/add',
      icon: 'add-circle',
    },
  ];

  constructor(
    public environmentInjector: EnvironmentInjector,
    private authService: AuthService,
    private nav: NavController,
    private platform: Platform,
    private toast: ToastController
  ) {
    //TODO: this.initializeApp();
    this.authService.loginChange$.subscribe(
      (logged) => (this.menuDisabled = !logged)
    );
  }
  //TODO: METODOS PUSH ACTUALMENTE NO LOS NECESITO
  // initializeApp() {
  //   if (this.platform.is('capacitor')) {
  //     this.platform.ready().then(() => {
  //       SplashScreen.hide();
  //       StatusBar.setBackgroundColor({ color: '#3880ff' });
  //       StatusBar.setStyle({ style: Style.Dark });
  //     });

  //     // Show us the notification payload if the app is open on our device
  //     PushNotifications.addListener(
  //       'pushNotificationReceived',
  //       async (notification: PushNotificationSchema) => {
  //         const toast = await this.toast.create({
  //           header: notification.title,
  //           message: notification.body,
  //           duration: 3000,
  //         });
  //         await toast.present();
  //       }
  //     );

  //     // Method called when tapping on a notification
  //     PushNotifications.addListener(
  //       'pushNotificationActionPerformed',
  //       (notification: ActionPerformed) => {
  //         if (notification.notification.data.prodId) {
  //           this.nav.navigateRoot([
  //             '/products',
  //             notification.notification.data.prodId,
  //             'comments',
  //           ]);
  //         }
  //       }
  //     );
  //   }
  // }

  async logout() {
    await this.authService.logout();
    this.nav.navigateRoot(['/auth/login']);
  }
}
