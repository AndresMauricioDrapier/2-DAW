import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";
import { TokenResponse} from "../interfaces/responses";
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
}
