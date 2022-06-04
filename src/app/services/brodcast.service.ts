import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrodcastService {
  private store = new BehaviorSubject<any>(null)
  constructor() { }

  setStore(store: any) {
    this.store.next(store);
  }

  getStore() {
    return this.store.asObservable();
  }
}
