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

        this.authService.loginGoogle(user);
      });
    } catch (err) {
      console.error(err);
    }
  }
}

//   userForm!: FormGroup;
//   emailControl!: FormControl<string>;
//   passwordControl!: FormControl<string>;
//   user: User = {
//     name: '',
//     password: '',
//     email: '',
//     avatar: '',
//     lat: 0,
//     lng: 0,
//   };
//   firebaseToken = '';

//   constructor(
//     private platform: Platform,
//     private authService: AuthService,
//     private navCtrl: NavController,
//     private alertCtrl: AlertController,
//     private readonly fb: NonNullableFormBuilder
//   ) {}

//   async ngOnInit() {
//     if (this.platform.is('capacitor')) {
//       PushNotifications.register();

//       // On success, we should be able to receive notifications
//       PushNotifications.addListener('registration', (token: Token) => {
//         this.firebaseToken = token.value;
//         console.log(token);
//       });

//       PushNotifications.addListener('registrationError', (error) => {
//         console.log(error);
//       });
//     }

//     this.emailControl = this.fb.control('', [
//       Validators.required,
//       Validators.email,
//     ]);
//     this.passwordControl = this.fb.control('', [
//       Validators.required,
//       Validators.pattern('^.{4,}$'),
//     ]);
//     this.userForm = this.fb.group({
//       email: this.emailControl,
//       password: this.passwordControl,
//     });
//     const coordinates = await Geolocation.getCurrentPosition({
//       enableHighAccuracy: true,
//     });
//     this.user.lat = coordinates.coords.latitude;
//     this.user.lng = coordinates.coords.longitude;
//   }

//   login() {
//     this.authService.login(this.user, this.firebaseToken).subscribe({
//       next: () => this.navCtrl.navigateRoot(['/products']),
//       error: async (error) => {
//         (
//           await this.alertCtrl.create({
//             header: 'Login error',
//             message: 'Incorrect email and/or password',
//             buttons: ['Ok'],
//           })
//         ).present();
//       },
//     });
//   }
//   loggedGoogle(user: gapi.auth2.GoogleUser): void {
//     this.userInfo.token = user.getAuthResponse().id_token;
//     console.log(this.userInfo, user.getAuthResponse().id_token);

//     this.http.loginGoogle(this.userInfo).subscribe({
//       next: () => this.router.navigate(['/restaurants']),
//     });
//   }

//   loggedFacebook(resp: fb.StatusResponse): void {
//     this.userInfo.token = resp.authResponse.accessToken;
//     this.userInfo.userId = resp.authResponse.userID;
//     this.http.loginFaceebok(this.userInfo).subscribe({
//       next: () => this.router.navigate(['/restaurants']),
//     });
//   }
//   validClasses(
//     ngModel: FormControl,
//     validClass = 'is-valid',
//     errorClass = 'is-invalid'
//   ): object {
//     return {
//       [validClass]: ngModel.touched && ngModel.valid,
//       [errorClass]: ngModel.touched && ngModel.invalid,
//     };
//   }
// }
