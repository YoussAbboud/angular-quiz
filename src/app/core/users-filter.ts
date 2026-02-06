import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersFilter {
  searchID = signal('');
  
  setSearchID(value: string){
    this.searchID.set(value);
  }

  clear(){
    this.searchID.set('');
  }
}
