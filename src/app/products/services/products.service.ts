import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { environments } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class ProductService {

  private baseUrl:string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]>{
      return this.http.get<Product[]>(`${this.baseUrl}/products`);
  }

  getProductById( id: string ): Observable<Product | undefined>{
    return this.http.get<Product>(`${this.baseUrl}/products/${ id }`)
      .pipe(
        catchError( error => of(undefined))
      )
  }

}
