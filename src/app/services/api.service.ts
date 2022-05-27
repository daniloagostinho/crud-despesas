import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import { Student } from '../student';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }


  getStudentsInformation(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(`${environment.baseURL}students.json`)
  }
}
