import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Balances } from 'src/app/models/balances.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  store = new BehaviorSubject<any>(null);
  storeRegister = new BehaviorSubject<any>(null);
  storeMouth = new BehaviorSubject<any>(null)
  searchDebtsByMouth = new BehaviorSubject<boolean>(false)
  searchRevenuesByMouth = new BehaviorSubject<boolean>(false)
  balancesExpenseTotal = new BehaviorSubject<any>(null)
  balancesReveuesTotal = new BehaviorSubject<any>(null)
  balanceTotal = new BehaviorSubject<any>(null)
  showPainelTextDebts = new BehaviorSubject<any>(false)
  showPainelTextRevenues = new BehaviorSubject<any>(null)
  prevNext  = new BehaviorSubject<any>(false)
  prev  = new BehaviorSubject<any>(false)
  prevRevenues = new BehaviorSubject<any>(false)
  constructor() { }

  getStore() {
    return this.store.asObservable();
  }

  setStore(data: any) {
    this.store.next(data)
  }

  setStorageRegisterRevenues(store: boolean) {
    this.storeRegister.next(store);
  }

  getStoreRegisterRevenues() {
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

  setBalancesExpenseTotal(store: any) {
    this.balancesExpenseTotal.next(store)
  }

  getBalancesExpenseTotal() {
    return this.balancesExpenseTotal.asObservable()
  }

  setRevenuesTotal(store: any) {
    this.balancesReveuesTotal.next(store)
  }

  getRevenuesTotal() {
    return this.balancesReveuesTotal.asObservable();
  }

  setBalanceTotal(store: any) {
    return this.balanceTotal.next(store);
  }

  getBalanceTotal() {
    return this.balanceTotal.asObservable();
  }

  setShowPainelTextDebts(show: any) {
    this.showPainelTextDebts.next(show)
  }

  getShowPainelTextDebts() {
    return this.showPainelTextDebts.asObservable()
  }

  setShowPainelTextRevenues(show: any) {
    this.showPainelTextRevenues.next(show)
  }

  getShowPainelTextRevenues() {
    return this.showPainelTextRevenues.asObservable()
  }


  setNext(store: any) {
    return this.prevNext.next(store);
  }

  getNext() {
    return this.prevNext.asObservable();
  }

  setPrev(store: any) {
    return this.prev.next(store);
  }

  getPrev() {
    return this.prev.asObservable();
  }

  setPrevRevenues(store: any) {
    this.prevRevenues.next(store)
  }

  getPrevRevenues() {
    return this.prevRevenues.asObservable()
  }
}
