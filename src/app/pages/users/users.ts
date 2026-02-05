import { Component, inject, signal, computed } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ApiService } from '../../core/api';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users',
  imports: [NgIf, NgFor, AsyncPipe, RouterLink],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users {
  private api = inject(ApiService);
  page = signal(1);
  
  userPage$ = computed(() => this.api.getUsersPage(this.page()));

  prev() {
    this.page.update((p) => Math.max(1, p - 1));
  }

  next(totalPages: number) {
    this.page.update((p) => Math.min(totalPages, p + 1));
  }
  
}
