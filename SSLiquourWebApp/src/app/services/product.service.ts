// src/app/services/product.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import configurl from '../../assets/config/config.json';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = configurl.apiServer.url + '/api/Liquor';

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }

  addProduct(productData: Product): Observable<Product> {
    return this.http.post<Product>(this.url, productData, {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    });
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.url}/${product.id}`, product, {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    });
  }
  
  deleteProductById(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.url}/${id}`);
  }
}
