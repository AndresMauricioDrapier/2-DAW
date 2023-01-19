import { Restaurant } from "./restaurant";
import { Commentary } from "./comment";

export interface RestaurantsResponse {
    restaurants: Restaurant[];
}

export interface RestaurantResponse {
    restaurant: Restaurant;
}
export interface CommentsResponse {
  comments: Commentary[];
}

export interface CommentResponse {
  comment: Commentary;
}
