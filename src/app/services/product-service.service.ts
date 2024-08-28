import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Endpoints } from '../const/endpoints';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(
    private http: HttpClient
  ) { }

  getCategory(): Observable<any>{
    return this.http.get<any>(Endpoints.PRODUCTS.GET_CATEGORIES);
  }

  getSubCategory(idCategory:number): Observable<any>{
    return this.http.get<any>(Endpoints.PRODUCTS.GET_SUBCATEGORY(idCategory));
  }

  setCategory(body:any): Observable<any>{
    return this.http.post<any>(Endpoints.LOGIN.VALIDATE_CREDENTIALS, {data:body});
  }
}
