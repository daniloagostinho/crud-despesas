import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import * as e from 'express';
import { LocalstorageService } from '../services/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  constructor(private localStorage: LocalstorageService,
    private router: Router) {

  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any {


      console.log('this.localStorage.getLocalStorage("token")', this.localStorage.getLocalStorage('token'))

    if(typeof this.localStorage.getLocalStorage('token') !== 'object') {
      console.log('CAI NO true')
      return true;
    }

    console.log('CAI NO FALSE')
    this.router.navigate(['/login'])
    return false;

  }

}
