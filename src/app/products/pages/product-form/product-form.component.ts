import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { Product, Publisher } from '../../interfaces/product.interface';
import { ProductService } from '../../services/products.service';
import { switchMap } from 'rxjs';

import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styles: ``
})
export class ProductFormComponent implements OnInit{

    public productForm = new FormGroup({
      id: new FormControl<string>('',),
      name: new FormControl<string>('',[ Validators.required,Validators.minLength(3),]),
      description: new FormControl<string>(''),
      price: new FormControl<number>(0, [ Validators.required,Validators.min(0),]),
      publisher:new FormControl<Publisher>( Publisher.DCComics),
      alt_img: new FormControl<string>(''),
    });

    public publishers = [
      { id: 'DC Comics', desc: 'DC - Comics'},
      { id: 'Marvel Comics', desc: 'Marvel - Comics'},
    ];

    constructor(
      private productService: ProductService,
      private activatedRoute:ActivatedRoute,
      private router: Router,
      private snackBar: MatSnackBar,
      private dialog: MatDialog ){}

    e1() {
      var u='',i=0;
      while(i++<36) {
          var c='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'[i-1],r=Math.random()*16|0,v=c=='x'?r:(r&0x3|0x8);
          u+=(c=='-'||c=='4')?c:v.toString(16)
      }
      return u;
    }

    get currentProduct(): Product {
      const product = this.productForm.value as Product;

      return product;
    }

    ngOnInit() : void{
        if( !this.router.url.includes('edit')) return;

        this.activatedRoute.params
          .pipe(
            switchMap( ({ id }) => this.productService.getProductById( id )),

          ).subscribe( product =>{
              if( !product ) return this.router.navigateByUrl('/');

              this.productForm.reset( product );
              return;
          });
    }

    onSubmit(): void{

      if ( this.productForm.invalid) return;

      if( this.currentProduct.id){
        this.productService.updateProduct( this.currentProduct )
          .subscribe( product => {
            // TODO mostrar snackbar
            this.showSnackbar(`${ product.name } updated!`);
          });

        return;
      }

      if( !this.currentProduct.id){
        this.currentProduct.id = this.e1();
        this.productService.addProduct( this.currentProduct )
        .subscribe( product =>{
          // TODO mostrar snackbar, y navegar a /products/edit/product.id
          this.router.navigate(['/products/edit', product.id]);

          this.showSnackbar(`${ product.name } created!`);
        })
      }
    }

    onDeleteProduct(){
        if( !this.currentProduct.id ) throw Error( 'product id is required');

        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          data: this.productForm.value,
        });

        dialogRef.afterClosed().subscribe(result => {
          if( !result ) return;
          this.productService.deleteProductById( this.currentProduct.id)
            .subscribe( wasDeleted => {
              if ( wasDeleted )
                this.router.navigate(['/products']);
            })
        });
    }

    showSnackbar( message: string ): void{
        this.snackBar.open( message, 'done', {
          duration: 2500,
        })
    }
}
