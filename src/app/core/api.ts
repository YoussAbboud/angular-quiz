import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';

import { environment } from '../../environments/environment';

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

  private headers = {
  'x-api-key': environment.reqresApiKey,
};

getUsersPage(page: number) {
  return this.http.get<UsersPageResponse>(
    `${this.baseUrl}/users?page=${page}`,
    { headers: this.headers }
  );
}

getUserById(id: number) {
  return this.http.get<SingleUserResponse>(
    `${this.baseUrl}/users/${id}`,
    { headers: this.headers }
  );
}
  
  clearCache() {
    this.usersPageCache.clear();
    this.userCache.clear();
  }
}
