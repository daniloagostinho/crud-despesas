import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { catchError, delay, Observable, throwError } from 'rxjs';
import { LocalstorageService } from './localstorage.service';
import { StoreService } from '../shared/service/store.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = `https://api-hands-on.herokuapp.com`
  urlLocal = 'http://localhost:3000'

  constructor(private httpClient: HttpClient,
    private localStorage: LocalstorageService) {
    }

  uploadFile(files: Set<File>) {
    const formData = new FormData();
    files.forEach(file => formData.append('file', file, file.name))
    return this.httpClient.post(this.url + '/upload', formData, {reportProgress: true, observe: 'events'}).pipe(
      delay(3000)
    )
  }

  downloadFile() {
    return this.httpClient.get(this.url + '/download')
  }

  registerUser(user: any) {
    return this.httpClient.post(this.url + '/auth/register/user', user).pipe(
      catchError((err) => {

        return throwError(err);
      })
    )
  }

  registerRevenues(revenues: any, user: any) {
    return this.httpClient.post(this.url + '/auth/revenues', revenues)
  }

  registerRegistrationDebts(debt: any) {
    return this.httpClient.post(this.url + '/auth/debts', debt)
  }

  updateDebts(id: any, payload: any) {
    return this.httpClient.put(this.url + '/update/debts/' + id, payload );
  }

  getRegisterRevenues(param: any, user: any) {
    let headers = new HttpHeaders();
    headers = headers.set('mouth', param).set('user', user)
    return this.httpClient.get(this.url + '/list/revenues', {headers: headers})
  }

  getRegisterDebts(param: any, user: any) {
    let headers = new HttpHeaders();
    headers = headers.set('mouth', param).set('user', user)
    return this.httpClient.get(this.url + '/list/debts', {headers: headers})
  }

  loginUser(user: any) {
    return this.httpClient.post(this.url + '/auth/login', user)
  }

  userData(nameToken: string) {
    const getToken = this.localStorage.getLocalStorage(nameToken);

    const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${getToken}`);
    return this.httpClient.get(this.url + '/list/user', {headers})
  }
  userInfo(nameToken: string, id: any) {
    const getToken = this.localStorage.getLocalStorage(nameToken);

    const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${getToken}`);

    return this.httpClient.get(this.url + `/user/${id}`, {headers: headers})
  }
}
