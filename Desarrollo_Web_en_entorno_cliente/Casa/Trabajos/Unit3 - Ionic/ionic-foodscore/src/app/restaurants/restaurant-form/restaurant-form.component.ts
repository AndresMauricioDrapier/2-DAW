import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, UrlTree } from '@angular/router';
import { Camera, CameraSource, CameraResultType } from '@capacitor/camera';
import { IonicModule, ToastController, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { OPENDAYS } from 'src/app/shared/consts';
import { ArcgisMapComponent } from 'src/app/shared/maps/arcgis-map/arcgis-map.component';
import { ArcgisMarkerDirective } from 'src/app/shared/maps/arcgis-marker/arcgis-marker.directive';
import { ArcgisSearchDirective } from 'src/app/shared/maps/arcgis-search/arcgis-search.directive';
import { SearchResult } from 'src/app/shared/maps/interfaces/search-result';
import { oneChecked } from 'src/app/shared/validators/checkedArray.validator';
import { Restaurant } from '../interfaces/restaurant';
import { RestaurantService } from '../services/restaurant.service';

@Component({
  selector: 'app-restaurant-form',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    ArcgisMapComponent,
    ArcgisMarkerDirective,
    ArcgisSearchDirective,
  ],
  templateUrl: './restaurant-form.component.html',
  styleUrls: ['./restaurant-form.component.scss'],
})
export class RestaurantFormComponent implements OnInit {
  restaurantForm!: FormGroup;
  nameControl!: FormControl<string>;
  descriptionControl!: FormControl<string>;
  cuisineControl!: FormControl;
  phoneControl!: FormControl<string>;
  addressControl!: FormControl<string>;
  daysOpen = OPENDAYS;
  days!: string[];


  newRestaurant: Restaurant = {
    name: '',
    description: '',
    cuisine: '',
    daysOpen: [],
    image: '',
    phone: '',
    address: '',
    lat: 0,
    lng: 0,
  };

  data!: Restaurant;

  constructor(
    private readonly http: RestaurantService,
    private readonly router: Router,
    private readonly fb: NonNullableFormBuilder,
    private readonly route: ActivatedRoute,
    private readonly alertController: AlertController,
  ) {
    this.route.data.subscribe((data) => {
      if (data['restaurant']) {
        this.data = data['restaurant'];
        this.newRestaurant = data['restaurant'];
      }
    });
  }
  ngOnInit(): void {
    this.nameControl = this.fb.control(this.newRestaurant.name, [
      Validators.required,
      Validators.pattern('[a-zA-Z ]+'),
    ]);
    this.descriptionControl = this.fb.control(this.newRestaurant.description, [
      Validators.required,
    ]);

    this.cuisineControl = this.fb.control(this.newRestaurant.cuisine, [
      Validators.required,
    ]);
    this.phoneControl = this.fb.control(this.newRestaurant.phone, [
      Validators.required,
      Validators.pattern('(\\+?[0-9]2 ?)?[0-9]{9}'),
    ]);
    this.addressControl = this.fb.control(this.newRestaurant.address);

    this.restaurantForm = this.fb.group({
      name: this.nameControl,
      description: this.descriptionControl,
      cuisine: this.cuisineControl,
      phone: this.phoneControl,
      address: this.addressControl,
    });
    navigator.geolocation.getCurrentPosition((pos) => {
      this.newRestaurant.lat = pos.coords.latitude;
      this.newRestaurant.lng = pos.coords.longitude;
    });

  }

  async takePhoto() {
    const photo = await Camera.getPhoto({
      source: CameraSource.Camera,
      quality: 90,
      height: 640,
      width: 640,
      // allowEditing: true,
      resultType: CameraResultType.DataUrl, // Base64 (url encoded)
    });

    this.newRestaurant.image = photo.dataUrl as string;
  }

  async pickFromGallery() {
    const photo = await Camera.getPhoto({
      source: CameraSource.Photos,
      height: 640,
      width: 640,
      // allowEditing: true,
      resultType: CameraResultType.DataUrl, // Base64 (url encoded)
    });

    this.newRestaurant.image = photo.dataUrl as string;
  }

  searchResult(result: SearchResult): void {
    this.newRestaurant.lat = result.latitude;
    this.newRestaurant.lng = result.longitude;
    this.newRestaurant.address = result.address;
  }
  addRestaurant(): void {
    this.addFormToRestaurant();

    this.route.data.subscribe((data) => {
      if (data['restaurant']) {
        this.http
          .addRestaurant(this.newRestaurant, data['restaurant'].id)
          .subscribe({
            next: () => {
              this.router.navigate(['/restaurants']);
            },
            error: (e) => console.log(e),
          });
      } else {
        this.http.addRestaurant(this.newRestaurant).subscribe({
          next: () => this.router.navigate(['/restaurants']),
          error: (e) => console.log(e),
        });
      }
    });
  }


  async showAlert2() {
    const alert = await this.alertController.create({
      header: 'Select an option',
      inputs: [
        {
          name: 'Sunday',
          type: 'checkbox',
          value: 'Sunday',
          label: 'Sunday',
          checked: true,
        },
        {
          name: 'Monday',
          type: 'checkbox',
          value: 'Monday',
          label: 'Monday',
          checked: true,
        },
        {
          name: 'Tuesday',
          type: 'checkbox',
          value: 'Tuesday',
          label: 'Tuesday',
          checked: true,
        },
        {
          name: 'Wednesday',
          type: 'checkbox',
          value: 'Wednesday',
          label: 'Wednesday',
          checked: true,
        },
        {
          name: 'Thursday',
          type: 'checkbox',
          value: 'Thursday',
          label: 'Thursday',
          checked: true,
        },
        {
          name: 'Friday',
          type: 'checkbox',
          value: 'Friday',
          label: 'Friday',
          checked: true,
        },
        {
          name: 'Saturday',
          type: 'checkbox',
          value: 'Saturday',
          label: 'Saturday',
          checked: true,
        },
      ],
      buttons: ['Ok', 'Cancel'],
    });

    await alert.present();

    const resp = await alert.onDidDismiss();
    if (resp.data && resp.role !== 'cancel') {
      this.days = resp.data.values;
    }
  }
  addFormToRestaurant(): void {
    this.newRestaurant.name = this.nameControl.value;
    this.newRestaurant.description = this.descriptionControl.value;
    this.newRestaurant.cuisine = this.cuisineControl.value;
    this.newRestaurant.daysOpen = this.booleanArray();
    this.newRestaurant.phone = this.phoneControl.value;
    console.log(this.newRestaurant);

  }

  booleanArray(): string[] {
    const array: string[] = [];

    for (let i = 0; i < this.days.length; i++) {
      switch (this.days[i]) {
        case 'Sunday':
          array[0] = 0 + '';
          break;
        case 'Monday':
          array[1] = 1 + '';
          break;
        case 'Tuesday':
          array[2] = 2 + '';
          break;
        case 'Wednesday':
          array[3] = 3 + '';
          break;
        case 'Thursday':
          array[4] = 4 + '';
          break;
        case 'Friday':
          array[5] = 5 + '';
          break;
        case 'Saturday':
          array[6] = 6 + '';
          break;
      }
    }

    return array;
  }
}
