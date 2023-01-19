import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, ReplaySubject } from "rxjs";
import { TokenResponse } from "../interfaces/responses";
import { User, UserLogin } from "../interfaces/user";

@Injectable({
    providedIn: "root",
})
export class UserService {
    logged = false;
    loginChange$ = new ReplaySubject<Boolean>();

    constructor(
        private readonly http: HttpClient,
        private readonly router: Router
    ) {}

    login(userLogin: UserLogin): Observable<void> {
        return this.http.post<void>("/auth/login", userLogin);
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
    logout(): void {
        this.loginChange$.next(false);
        this.logged = false;

        localStorage.removeItem("token");
        this.router.navigate(["/restaurants"]);
    }
}
