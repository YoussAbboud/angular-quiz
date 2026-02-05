import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';

export type ReqResUser = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export type UsersPageResponse = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: ReqResUser[];
};

export type SingleUserResponse = {
  data: ReqResUser;
};

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly baseUrl = 'https://reqres.in/api';
  private usersPageCache = new Map<number, Observable<UsersPageResponse>>();
  private userCache = new Map<number, Observable<SingleUserResponse>>();

  constructor(private http: HttpClient) {}

  getUsersPage(page: number): Observable<UsersPageResponse> {
    const cached = this.usersPageCache.get(page);
    if (cached) return cached;

    const req$ = this.http
      .get<UsersPageResponse>(`${this.baseUrl}/users?page=${page}`)
      .pipe(shareReplay(1));

    this.usersPageCache.set(page, req$);
    return req$;
  }

  getUserById(id: number): Observable<SingleUserResponse> {
    const cached = this.userCache.get(id);
    if (cached) return cached;

    const req$ = this.http
      .get<SingleUserResponse>(`${this.baseUrl}/users/${id}`)
      .pipe(shareReplay(1));

    this.userCache.set(id, req$);
    return req$;
  }
  
  clearCache() {
    this.usersPageCache.clear();
    this.userCache.clear();
  }
}
