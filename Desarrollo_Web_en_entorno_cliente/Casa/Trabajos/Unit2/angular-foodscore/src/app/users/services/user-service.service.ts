import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { User } from '../interfaces/user';
import { UserResponse } from '../interfaces/responses';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly USERS_URL = 'users';
  constructor(private readonly http: HttpClient) {}

  getUser(id: number): Observable<User> {
    return this.http.get<UserResponse>(`${this.USERS_URL}/${id}`).pipe(
      map((r) => r.restaurant),
      catchError((resp: HttpErrorResponse) =>
        throwError(
          () =>
            `Error getting user. Status: ${resp.status}. Message: ${resp.message}`
        )
      )
    );
  }

  addUser(user: User): Observable<User> {
    return this.http
      .post<UserResponse>(this.USERS_URL, user)
      .pipe(map((resp) => resp.restaurant));
  }

  saveProfile(name: string, email: string): Observable<void> {
    return this.http.put<void>(this.USERS_URL + '/users/me', { name, email });
  }

  saveAvatar(avatar: string): Observable<string> {
    return this.http.put<string>(this.USERS_URL + '/users/me/avatar', {
      avatar,
    });
  }

  savePassword(password: string): Observable<void> {
    return this.http.put<void>(this.USERS_URL + '/users/me/password', {
      password,
    });
  }
}
