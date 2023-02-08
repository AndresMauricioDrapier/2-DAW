import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  AlertController,
  IonicModule,
  NavController,
  Platform,
} from '@ionic/angular';
import { UserLogin } from '../interfaces/user.interface';
import { AuthService } from '../services/auth.service';
import { User, GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  firebaseToken = '';
  user: UserLogin = {
    email: '',
    password: '',
    lat: 0,
    lng: 0,
    token: '',
    image: '',
    userId: '',
  };
  userGoogle!: User;

  constructor(
    private platform: Platform,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    // if (this.platform.is('capacitor')) {
    //   PushNotifications.register();
    //   // On success, we should be able to receive notifications
    //   PushNotifications.addListener('registration', (token: Token) => {
    //     this.firebaseToken = token.value;
    //     console.log(token);
    //   });
    //   PushNotifications.addListener('registrationError', (error) => {
    //     console.log(error);
    //   });
    // }
  }

  login() {
    this.authService
      .login(this.email, this.password, this.firebaseToken)
      .subscribe({
        next: () => this.navCtrl.navigateRoot(['/restaurants']),
        error: async (error) => {
          (
            await this.alertCtrl.create({
              header: 'Login error',
              message: error.error,
              buttons: ['Ok'],
            })
          ).present();
        },
      });
  }
  async loggedGoogle() {
    try {
      await GoogleAuth.signIn().then((user) => {
        this.authService.loginGoogle(user).subscribe({
          next: () => this.navCtrl.navigateRoot(['/restaurants']),
          error: async (err) => {
            (
              await this.alertCtrl.create({
                header: 'Login error',
                message: err.error,
                buttons: ['Ok'],
              })
            ).present();
          },
        });
      });
    } catch (err) {
      console.error(err);
    }
  }
}

