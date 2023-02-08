import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Restaurant } from '../interfaces/restaurant';
import { FormsModule } from '@angular/forms';
import { RestaurantCardComponent } from '../restaurant-card/restaurant-card.component';
import { RestaurantFilterPipe } from '../pipes/restaurant-filter.pipe';
import { RestaurantService } from '../services/restaurant.service';

import { User } from 'src/app/auth/interfaces/user.interface';

import { IonicModule, IonRefresher } from '@ionic/angular';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from 'src/app/users/services/user-service.service';

@Component({
  selector: 'fs-restaurants-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RestaurantCardComponent,
    RestaurantFilterPipe,
    IonicModule,
    RouterLink
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
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['creator']) {
        this.userService
          .getUser(+params['creator'])
          .subscribe((u) => (this.user = u));
        this.http.getRestaurants().subscribe(
          (restaurant) =>
            (this.restaurants = restaurant.filter((r) => {
              if (r.mine) {
                return r.creator?.id == params['creator'];
              } else {
                return r.creator == params['creator'];
              }
            }))
        );
        this.userCreated = true;
      } else {
        this.http
          .getRestaurants()
          .subscribe((restaurant) => (this.restaurants = restaurant));

        this.userCreated = false;
      }
    });
  }
  reloadProducts(refresher: IonRefresher) {
    if (!this.userCreated) {
      this.http.getRestaurants().subscribe((prods) => {
        this.restaurants = prods;
        refresher.complete();
      });
    }
  }

  setActive() {
    this.active=this.active?false:true;
  }


  changeClassButton(): boolean {
    this.active = !this.active;
    return this.active;
  }
}
