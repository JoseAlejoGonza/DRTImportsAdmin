import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Endpoints } from '../const/endpoints';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(
    private http: HttpClient
  ) { }

  getProducts(): Observable<any>{
    return this.http.get<any>(Endpoints.PRODUCTS.GET_PRODUCTS);
  }

  setLogin(body:any): Observable<any>{
    return this.http.post<any>(Endpoints.LOGIN.VALIDATE_CREDENTIALS, {data:body});
  }

  getUsers(): Observable<any>{
    return this.http.get<any>(Endpoints.USERS.GET_USERS);
  }
}
