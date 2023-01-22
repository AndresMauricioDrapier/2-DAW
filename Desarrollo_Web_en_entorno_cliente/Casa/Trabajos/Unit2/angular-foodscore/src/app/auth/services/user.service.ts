import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of, ReplaySubject } from "rxjs";
import { TokenResponse } from "../interfaces/responses";
import { User, UserLogin } from "../interfaces/user";

@Injectable({
    providedIn: "root",
})
export class UserService {
    logged = false;
    loginChange$ = new ReplaySubject<boolean>();

    constructor(
        private readonly http: HttpClient,
        private readonly router: Router
    ) {}

    login(userLogin: UserLogin): Observable<void> {
        const login = this.http.post<void>("/auth/login", userLogin);
        login.subscribe((token) => {
            this.putToken((token as unknown as TokenResponse).accessToken);
        });

        return login;
    }

    register(userInfo: User): Observable<void> {
        return this.http.post<void>("auth/register", userInfo);
    }

    validateToken(): Observable<TokenResponse> {
        return this.http.get<TokenResponse>("/auth/validate");
    }
    putToken(token?: string): void {
        if (token) localStorage.setItem("token", token);
    }
    isLogged(): Observable<boolean> {
        if (!this.logged && !localStorage.getItem("token")) {
            return of(false);
        } else if (this.logged && localStorage.getItem("token")) {
            return of(true);
        } else {
            if (this.validateToken()) {
                this.logged = true;
                this.loginChange$.next(true);
                return of(true);
            } else {
                localStorage.removeItem("token");
                return of(false);
            }
        }
    }

    logout(): void {
        this.loginChange$.next(false);
        this.logged = false;

        localStorage.removeItem("token");
        this.router.navigate(["/restaurants"]);
    }
}
