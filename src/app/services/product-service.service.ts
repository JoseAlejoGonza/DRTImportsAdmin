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
    return this.http.post<any>(Endpoints.PRODUCTS.SET_CATEGORY, {data:body});
  }

  setSubcategory(body:any): Observable<any>{
    return this.http.post<any>(Endpoints.PRODUCTS.SET_SUBCATEGORY, {data:body});
  }

  getProductCodeBar(codeBar:number): Observable<any>{
    return this.http.get<any>(Endpoints.PRODUCTS.GET_PRODUCT_CODEBAR(codeBar));
  }

  setProduct(body:any): Observable<any>{
    return this.http.post<any>(Endpoints.PRODUCTS.SET_PRODUCT, {data:body});
  }

  getProduct(): Observable<any>{
    return this.http.get<any>(Endpoints.PRODUCTS.GET_PRODUCTS);
  }

  editProduct(body:any): Observable<any>{
    return this.http.put<any>(Endpoints.PRODUCTS.EDIT_PRODUCT, {data:body});
  }
}
