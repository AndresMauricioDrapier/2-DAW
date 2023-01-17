import { RESTAURANTS } from "./constants";
import { Http } from "./http";
import { Restaurant } from "./interfaces/restaurant";
import { RestaurantResponse, RestaurantsResponse } from "./interfaces/responses";

export class RestaurantService {
    private http: Http;
    constructor() {
        this.http = new Http();
    }

    getAll() {
        return this.http.get<RestaurantsResponse>(RESTAURANTS);
    }

    post(restaurant: Restaurant) {
        return this.http.post<RestaurantResponse>(RESTAURANTS, restaurant);
    }

    delete(id: number) {
        return this.http.delete<void>(`${RESTAURANTS}/${id}`).catch(e => e);
    }

}