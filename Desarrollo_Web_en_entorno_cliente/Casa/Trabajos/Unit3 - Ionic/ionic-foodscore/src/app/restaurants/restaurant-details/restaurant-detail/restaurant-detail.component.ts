import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { IonicModule, AlertController, NavController } from '@ionic/angular';
import { OPENDAYS } from 'src/app/shared/consts';
import { Restaurant } from '../../interfaces/restaurant';
import { RestaurantService } from '../../services/restaurant.service';
import { RestaurantDetailsComponent } from '../restaurant-details.component';
import { RestaurantCardComponent } from '../../restaurant-card/restaurant-card.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-info',
  standalone: true,
  imports: [CommonModule, IonicModule, RestaurantCardComponent,RouterModule],
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.scss'],
})
export class RestaurantDetailComponent implements OnInit {
  restaurant!: Restaurant;

  constructor(
    private alertCrl: AlertController,
    private restaurantService: RestaurantService,
    private nav: NavController,
    @Inject(RestaurantDetailsComponent)
    private parentComponent: RestaurantDetailsComponent
  ) {}

  ngOnInit() {
    this.parentComponent.restaurant$.subscribe((restaurant) => {
      this.restaurant = restaurant;
    });
  }
}
