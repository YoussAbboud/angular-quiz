import { Component, inject, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { UsersFilter } from '../../core/users-filter';

@Component({
  selector: 'app-header',
  imports: [NgIf],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  private filter = inject(UsersFilter);

  searchId = signal('');

  error = signal<string | null>(null);

  onInput(value: string){
    this.searchId.set(value);
    this.error.set(null);
    this.filter.setSearchID(value.trim());
  }

  submit(){
    const raw = this.searchId().trim();

    if(!raw){
      this.filter.clear();
      this.error.set(null);
      return;
    }

    const id = Number(raw);
    if(Number.isNaN(id) || !Number.isInteger(id) || id <= 0){
      this.error.set("Enter a valid ID");
      return;
    }

    this.filter.setSearchID(String(id));
  }

  clear(){
    this.searchId.set("");
    this.filter.clear();
    this.error.set(null);
  }

}
