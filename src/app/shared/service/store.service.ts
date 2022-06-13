import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  store = new BehaviorSubject<any>(null);
  storeRegister = new BehaviorSubject<any>(null);
  storeMouth = new BehaviorSubject<any>(null)
  searchDebtsByMouth = new BehaviorSubject<boolean>(false)
  searchRevenuesByMouth = new BehaviorSubject<boolean>(false)
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

  setSearchDebtsByMouth(store: any) {
    this.searchDebtsByMouth.next(store);
  }

  getSearchDebtsByMouth() {
    return this.searchDebtsByMouth.asObservable();
  }

  setSearchRevenuesByMouth(store: any) {
    this.searchRevenuesByMouth.next(store);
  }

  getSearchRevenuesByMouth() {
    return this.searchRevenuesByMouth.asObservable();
  }
}
