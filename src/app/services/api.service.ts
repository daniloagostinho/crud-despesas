import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { delay, Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = `https://api-hands-on.herokuapp.com`
  urlLocal = 'http://localhost:3000'
  constructor(private httpClient: HttpClient,
    private localStorage: LocalstorageService) { }

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
    return this.httpClient.post(this.url + '/auth/register', user)
  }

  loginUser(user: any) {
    return this.httpClient.post('api/auth/login', user)
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
