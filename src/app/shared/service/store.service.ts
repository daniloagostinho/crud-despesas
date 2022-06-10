import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  store = new BehaviorSubject<any>(null);
  storeRegister = new BehaviorSubject<any>(null);
  storeMouth = new BehaviorSubject<any>(null)
  constructor() { }

  getStore() {
    return this.store.asObservable();
  }

  setStore(data: any) {
    this.store.next(data)
  }

  setStoreRegister(store: boolean) {
    this.storeRegister.next(store);
  }

  getStoreRegister() {
    return this.storeRegister.asObservable();
  }

  setStoreMouth(store: any) {
    this.storeMouth.next(store);
  }

  getStoreMouth() {
    return this.storeMouth.asObservable();
  }
}
