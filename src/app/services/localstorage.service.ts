import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  getLocalStorage(item: string) {
    return JSON.parse(localStorage.getItem(item) || '{}');
  }

  setLocalStorage(name: string, item: any) {
    localStorage.setItem(name, item);
  }

  removeLocalStorage(name: string) {
    localStorage.removeItem(name)
  }

}
