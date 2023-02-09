import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";
import { Commentary } from "../interfaces/comment";
import {
    CommentsResponse,
    RestaurantResponse,
    RestaurantsResponse,
} from "../interfaces/responses";
import { Restaurant } from "../interfaces/restaurant";

@Injectable({
    providedIn: "root",
})
export class RestaurantService {
    private readonly RESTAURANTS_URL = "restaurants";
    constructor(private readonly http: HttpClient) {}

    getRestaurants(): Observable<Restaurant[]> {
        return this.http.get<RestaurantsResponse>(this.RESTAURANTS_URL).pipe(
            map((r) => r.restaurants),
            catchError((resp: HttpErrorResponse) =>
                throwError(
                    () =>
                        `Error getting products. Status: ${resp.status}. Message: ${resp.message}`
                )
            )
        );
    }
    getIdRestaurant(id: number): Observable<Restaurant> {
        return this.http
            .get<RestaurantResponse>(`${this.RESTAURANTS_URL}/${id}`)
            .pipe(map((r) => r.restaurant));
    }
    getComments(id: number): Observable<CommentsResponse> {
        return this.http.get<CommentsResponse>(
            `${this.RESTAURANTS_URL}/${id}/comments`
        );
    }
    addComment(id: number, comment: Commentary): Observable<Commentary> {
        return this.http
            .post<Commentary>(`${this.RESTAURANTS_URL}/${id}/comments`, comment)
            .pipe(
                map((rest) => {

                    return rest;
                })
            );
    }
    addRestaurant(rest: Restaurant, id?: number): Observable<Restaurant> {
        if (id) {
            return this.http
                .put<RestaurantResponse>(`${this.RESTAURANTS_URL}/${id}`, rest)
                .pipe(map((rest) => rest.restaurant));
        } else {
            return this.http
                .post<RestaurantResponse>(`${this.RESTAURANTS_URL}`, rest)
                .pipe(map((rest) => rest.restaurant));
        }
    }

    deleteRestaurant(id: number): Observable<void> {
        return this.http.delete<void>(`${this.RESTAURANTS_URL}/${id}`);
    }
}
