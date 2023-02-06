import { Component, EnvironmentInjector, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Restaurant } from '../interfaces/restaurant';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RestaurantCardComponent } from '../restaurant-card/restaurant-card.component';

import { RestaurantService } from '../services/restaurant.service';
import { IonicModule } from '@ionic/angular';
import { Observable, shareReplay } from 'rxjs';

@Component({
  selector: 'fs-restaurant-details',
  standalone: true,
  imports: [CommonModule, RouterModule, RestaurantCardComponent, IonicModule],
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.css'],
})
export class RestaurantDetailsComponent implements OnInit {
  restaurant!: Restaurant;
  restaurant$!: Observable<Restaurant>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private readonly http: RestaurantService,
    public environmentInjector: EnvironmentInjector,
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.restaurant = data['restaurant'];
    });

    this.restaurant$ = this.http
      .getIdRestaurant(this.route.snapshot.params['id'])
      .pipe(shareReplay(1));
    this.restaurant$.subscribe((rest) => {
      this.restaurant = rest;
    });
  }
  goBack(): void {
    this.router.navigate(['/restaurants']);
  }

  delete(): void {
    this.router.navigate(['/restaurants']);
  }
}
