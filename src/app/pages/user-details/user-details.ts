import { Component, inject } from '@angular/core';
import { AsyncPipe, NgIf, Location } from '@angular/common';
import { ApiService } from '../../core/api';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [NgIf, AsyncPipe, RouterLink],
  templateUrl: './user-details.html',
  styleUrl: './user-details.scss',
})
export class UserDetails {

  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
  private location = inject(Location);

  id = Number(this.route.snapshot.paramMap.get('id'));

  user$ = this.api.getUserById(this.id);

  goBack(){
    this.location.back();
  }

}
