import { User } from "./user";

export interface UsersResponse {
  restaurants: User[];
}

export interface UserResponse {
  restaurant: User;
}
