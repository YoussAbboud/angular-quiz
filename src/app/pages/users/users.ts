import { Component } from '@angular/core';
import { ApiService } from '../../core/api';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users {
constructor(private api: ApiService) {
    this.api.getUsersPage(1).subscribe(res => console.log('users page 1', res));
  }
}
