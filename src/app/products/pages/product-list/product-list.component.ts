import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { ProductService } from '../../services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styles: ``
})
export class ProductListComponent implements OnInit{

  public products: Product[] = [];

  constructor( private productService: ProductService){
  }

  ngOnInit(): void {
      this.productService.getProducts()
        .subscribe( products => this.products = products);
  }
}
