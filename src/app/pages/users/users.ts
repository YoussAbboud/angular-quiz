import { Component, inject, signal, computed } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ApiService } from '../../core/api';
import { RouterLink } from '@angular/router';
import { UsersFilter } from '../../core/users-filter';

@Component({
  selector: 'app-users',
  imports: [NgIf, NgFor, AsyncPipe, RouterLink],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users {
  private api = inject(ApiService);
  private filter = inject(UsersFilter)
  page = signal(1);

  searchId = computed(()=> this.filter.searchID().trim());
  
  userPage$ = computed(() => this.api.getUsersPage(this.page()));
  singleUser$ = computed(()=> {
    const raw = this.searchId();
    if(!raw) return null;
    const id = Number(raw);
    if(!Number.isInteger(id) || id <= 0) return null;
    return this.api.getUserById(id);
  })

  prev() {
    this.page.update((p) => Math.max(1, p - 1));
  }

  next(totalPages: number) {
    this.page.update((p) => Math.min(totalPages, p + 1));
  }
  
}
