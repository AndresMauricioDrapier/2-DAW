import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, ReplaySubject, throwError } from "rxjs";
import { TokenResponse, UserResponse, UsersResponse } from "../interfaces/responses";
import { User, UserLogin } from "../interfaces/user";

@Injectable({
    providedIn: "root",
})
export class UserService {
    logged = false;
    loginChange$ = new ReplaySubject<Boolean>();

    constructor(private readonly http: HttpClient) {}

    login(userLogin: UserLogin): Observable<void> {
        const login = this.http.post<void>(
            "/auth/login",
            userLogin
        );

        login.subscribe((user) => {
            console.log(user);
        });
        return login;
    }

    register(userInfo: User): Observable<void> {
        return this.http.post<void>("auth/register", userInfo);
    }
    validateToken(): Observable<TokenResponse> {
        return this.http.get<TokenResponse>("/auth/validate");
    }
    // checkToken(token: string): Promise<void> {
    //     localStorage.setItem("token", token);
    // }
    logout(): void {
        localStorage.removeItem("token");
        location.assign("../index.html");
    }
    // getRestaurants(): Observable<User[]> {
    //     return this.http.get<UsersResponse>().pipe(
    //         map((r) => r.users),
    //         catchError((resp: HttpErrorResponse) =>
    //             throwError(
    //                 () =>
    //                     `Error getting products. Status: ${resp.status}. Message: ${resp.message}`
    //             )
    //         )
    //     );
    // }
    // getIdRestaurant(id: number): Observable<User> {
    //     return this.http
    //         .get<UserResponse>(`${this.RESTAURANTS_URL}/${id}`)
    //         .pipe(map((r) => r.user));
    // }
    // addRestaurant(rest: User): Observable<User> {
    //     return this.http
    //         .post<UserResponse>(this.RESTAURANTS_URL, rest)
    //         .pipe(map((rest) => rest.user));
    // }

    // deleteRestaurant(id: number): Observable<void> {
    //     return this.http.delete<void>(`${this.RESTAURANTS_URL}/${id}`);
    // }
}
