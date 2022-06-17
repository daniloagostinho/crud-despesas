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

    if(typeof this.localStorage.getLocalStorage('token') !== 'object') {
      return true;
    }

    this.router.navigate(['/login'])
    return false;

  }

}
