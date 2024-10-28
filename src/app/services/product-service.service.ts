import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Endpoints } from '../const/endpoints';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  private totalPurchases = new BehaviorSubject<any>(this.getTotalPurchasesFromStorage());
  totalPurchases$ = this.totalPurchases.asObservable();

  constructor(
    private http: HttpClient
  ) {
    if (this.isBrowser()) {
      this.totalPurchases$.subscribe((items) => {
        this.saveTotalPurchasesToStorage(items);
      });
    }
   }

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

  getPurchases(): Observable<any>{
    return this.http.get<any>(Endpoints.PURCHASES.GET_PRODUCTS);
  }

  getHistoryPurchases(): Observable<any>{
    return this.http.get<any>(Endpoints.PURCHASES.GET_HISTORY);
  }

  getPurchasesDelivered(): Observable<any>{
    return this.http.get<any>(Endpoints.PURCHASES.GET_PRODUCTS_DELIVERED);
  }

  updateTotalPurchase(total:number){
    this.totalPurchases.next(total);
  }

  private saveTotalPurchasesToStorage(items: any[]) {
    if (this.isBrowser()) {
      localStorage.setItem('totalPurchases', JSON.stringify(items));
    }
  }

  private getTotalPurchasesFromStorage(): any[] {
    if (this.isBrowser()) {
      const storedTotalItems = localStorage.getItem('totalPurchases');
      return isNaN(parseFloat(storedTotalItems!)) ? null : JSON.parse(storedTotalItems!);
    }
    return [];
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  getDetailProducts(idPurchase:number): Observable<any>{
    return this.http.get<any>(Endpoints.PURCHASES.GET_DETAIL_PRODUCTS(idPurchase));
  }

  sendPurchase(body:any): Observable<any>{
    return this.http.put<any>(Endpoints.PURCHASES.SEND_PURCHASE, {data:body});
  }
}
