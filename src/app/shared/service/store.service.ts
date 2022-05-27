import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  store = new BehaviorSubject<any>(null);
  constructor() { }

  getStore() {
    return this.store.asObservable();
  }

  setStore(data: any) {
    this.store.next(data)
  }
}
