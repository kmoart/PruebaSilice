import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
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

  addProduct( product: Product ): Observable<Product>{
    return this.http.post<Product>(`${ this.baseUrl}/products`, product );
  }

  updateProduct( product: Product ): Observable<Product>{
    if( !product.id ) throw Error(' Product id is required');

    return this.http.patch<Product>(`${ this.baseUrl}/products/${ product.id }`, product );
  }

  deleteProductById( id: string  ): Observable<Boolean>{

    return this.http.delete(`${ this.baseUrl}/products/${ id }`)
      .pipe(
        catchError( err => of(false)),
        map( resp => true)
      );
  }

}
