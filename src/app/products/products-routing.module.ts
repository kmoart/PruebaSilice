import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { ProductFormComponent } from './pages/product-form/product-form.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductListComponent } from './pages/product-list/product-list.component';

// localhost:4200/productos/''
const routes: Routes = [
  {
    path: '',
    component:  LayoutComponent,
    children: [
      { path: 'new-product', component: ProductFormComponent},
      { path: 'edit/:id', component: ProductFormComponent},
      { path: 'list', component: ProductListComponent},
      { path: ':id', component: ProductDetailComponent},
      { path: '**', redirectTo: 'list'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
