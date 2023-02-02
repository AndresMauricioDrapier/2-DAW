import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Restaurant } from '../interfaces/restaurant';
import { FormsModule } from '@angular/forms';
import { RestaurantCardComponent } from '../restaurant-card/restaurant-card.component';
import { RestaurantFilterPipe } from '../pipes/restaurant-filter.pipe';
import { RestaurantService } from '../services/restaurant.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/auth/interfaces/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IonicModule, IonRefresher } from '@ionic/angular';

@Component({
  selector: 'fs-restaurants-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RestaurantCardComponent,
    RestaurantFilterPipe,
    IonicModule
  ],
  templateUrl: './restaurants-page.component.html',
  styleUrls: ['./restaurants-page.component.css'],
})
export class RestaurantsPageComponent implements OnInit {
  restaurants: Restaurant[] = [];
  user!: User;
  active = true;
  filterSearch = '';
  userCreated = false;
  constructor(
    private readonly http: RestaurantService,
    private readonly route: ActivatedRoute,
    private readonly httpUser: AuthService
  ) {}

  ngOnInit(): void {
    this.http.getRestaurants().subscribe({
      next: (rest) => {
        this.userCreated = false;
        this.restaurants = rest;
      },
      error: (error) => console.log(error),
    });
  }
  reloadProducts(refresher: IonRefresher) {
    this.http
    .getRestaurants()
    .subscribe((prods) => {
      this.restaurants = prods;
      refresher.complete();
    });
  }

  changeClassButton(): boolean {
    this.active = !this.active;
    return this.active;
  }

}
