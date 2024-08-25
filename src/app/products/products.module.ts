import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { MaterialModule } from '../material/material.module';

import { LayoutComponent } from './pages/layout/layout.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductFormComponent } from './pages/product-form/product-form.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { CardComponent } from './components/card/card.component';
import { ProductImagePipe } from './pipes/product-image.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LayoutComponent,
    ProductListComponent,
    ProductFormComponent,
    ProductDetailComponent,
    CardComponent,
    ProductImagePipe
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductsModule { }
