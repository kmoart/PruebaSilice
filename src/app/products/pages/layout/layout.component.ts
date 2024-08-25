import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styles: ``
})
export class LayoutComponent {

  public sidebarItems= [
    { label: 'Lista de Productos', icon: 'label', url: './list'},
    { label: 'Crear Producto', icon: 'add', url: './new-product'},
  ]

}
