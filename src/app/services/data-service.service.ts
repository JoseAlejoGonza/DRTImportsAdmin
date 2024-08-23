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

  postLogin(body:any): Observable<any>{
    return this.http.post<any>(Endpoints.LOGIN.VALIDATE_CREDENTIALS, body);
  }
}
