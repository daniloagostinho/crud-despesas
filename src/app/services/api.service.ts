import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { delay, Observable } from 'rxjs';
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
    return this.httpClient.post(this.urlLocal + '/upload', formData, {reportProgress: true, observe: 'events'}).pipe(
      delay(3000)
    )
  }

  downloadFile() {
    return this.httpClient.get(this.urlLocal + '/download')
  }

  registerUser(user: any) {
    return this.httpClient.post(this.urlLocal + '/auth/register/user', user)
  }

  registerRevenues(revenues: any) {
    return this.httpClient.post(this.urlLocal + '/auth/revenues', revenues)
  }

  registerRegistrationDebts(debt: any) {
    return this.httpClient.post(this.urlLocal + '/auth/debts', debt)
  }

  getRegisterRevenues(param: any) {
    let headers = new HttpHeaders();
    headers = headers.set('mouth', param)
    return this.httpClient.get(this.urlLocal + '/list/revenues', {headers: headers})
  }

  getRegisterDebts(param: any) {
    let headers = new HttpHeaders();
    headers = headers.set('mouth', param)
    return this.httpClient.get(this.urlLocal + '/list/debts', {headers: headers})
  }

  loginUser(user: any) {
    return this.httpClient.post(this.urlLocal + '/auth/login', user)
  }

  userData(nameToken: string) {
    const getToken = this.localStorage.getLocalStorage(nameToken);

    const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${getToken}`);
    return this.httpClient.get(this.urlLocal + '/list/user', {headers})
  }
  userInfo(nameToken: string, id: any) {
    const getToken = this.localStorage.getLocalStorage(nameToken);

    const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${getToken}`);

    return this.httpClient.get(this.urlLocal + `/user/${id}`, {headers: headers})
  }
}
