import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit} from '@angular/core';
import { IonicModule} from '@ionic/angular';
import { StartNavigation } from '@proteansoftware/capacitor-start-navigation/dist/esm/web';
import { ArcgisMapComponent } from 'src/app/shared/maps/arcgis-map/arcgis-map.component';
import { ArcgisMarkerDirective } from 'src/app/shared/maps/arcgis-marker/arcgis-marker.directive';
import { ArcgisSearchDirective } from 'src/app/shared/maps/arcgis-search/arcgis-search.directive';
import { Restaurant } from '../../interfaces/restaurant';
import { RestaurantDetailsComponent } from '../restaurant-details.component';

@Component({
  selector: 'app-restaurant-comments',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ArcgisMapComponent,
    ArcgisMarkerDirective,
    ArcgisSearchDirective,
  ],
  templateUrl: './restaurant-location.component.html',
  styleUrls: ['./restaurant-location.component.scss'],
})
export class RestaurantLocationComponent implements OnInit {
  restaurant!: Restaurant;

  constructor(
    @Inject(RestaurantDetailsComponent)
    private parentComponent: RestaurantDetailsComponent
  ) {}

  ngOnInit() {
    this.parentComponent.restaurant$.subscribe((restaurant) => {
      this.restaurant = restaurant;
    });
  }

  startNavigation() {
    StartNavigation.launchMapsApp({
      latitude: this.restaurant.lat,
      longitude: this.restaurant.lng,
      name: 'Directions example',
    });
  }
}
