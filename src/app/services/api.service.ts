import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { delay, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = `http://localhost:3000`
  constructor(private httpClient: HttpClient) { }

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
}
