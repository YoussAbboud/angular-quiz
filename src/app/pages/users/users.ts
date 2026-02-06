import { Component, inject, signal, computed, effect } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ApiService, ReqResUser } from '../../core/api';
import { RouterLink, ɵEmptyOutletComponent } from '@angular/router';
import { UsersFilter } from '../../core/users-filter';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  imports: [NgIf, NgFor, AsyncPipe, RouterLink, ɵEmptyOutletComponent],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users {
  private api = inject(ApiService);
  private filter = inject(UsersFilter)
  page = signal(1);
  isSearching = signal(false);
  searchFailed = signal(false);

  searchId = computed(()=> this.filter.searchID().trim());
  userPage$ = computed(() => this.api.getUsersPage(this.page()));

  searchedUser = signal<ReqResUser | null>(null);
  private searchSub?: Subscription;

  constructor(){
    effect(()=>{
      const raw = this.searchId();

      this.searchSub?.unsubscribe();
      this.searchSub = undefined;
    if(!raw){
      this.isSearching.set(false);
      this.searchFailed.set(false);
      this.searchedUser.set(null);
      return;
    }
    const id = Number(raw);
    if(!Number.isInteger(id) || id <= 0){
      this.isSearching.set(false);
      this.searchFailed.set(false);
      this.searchedUser.set(null);
      return;
    }

    this.isSearching.set(true);
    this.searchFailed.set(false);
    this.searchedUser.set(null);

    this.searchSub = this.api.getUserById(id).subscribe({
      next:(res) => {
        this.searchedUser.set(res.data);
        this.searchFailed.set(false);
        this.isSearching.set(false);
      },
      error: ()=>{
        this.searchedUser.set(null);
        this.searchFailed.set(true);
        this.isSearching.set(false);
      }
    });
    });
  }

  prev() {
    this.page.update((p) => Math.max(1, p - 1));
  }

  next(totalPages: number) {
    this.page.update((p) => Math.min(totalPages, p + 1));
  }
  
}
