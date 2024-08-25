import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styles: ``
})
export class ProductDetailComponent implements OnInit{

  public product?: Product;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.productService.getProductById( id )),

      ).subscribe( product =>{
        if( !product ) return this.router.navigate(['/products/list']);

        this.product = product;
        console.log(product);
        return;
      })
  }

  goBack(): void{
      this.router.navigateByUrl('products/list');
  }

}
