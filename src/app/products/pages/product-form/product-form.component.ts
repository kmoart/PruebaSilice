import { Component } from '@angular/core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styles: ``
})
export class ProductFormComponent {

    public publishers = [
      { id: 'DC Comics', desc: 'DC - Comics'},
      { id: 'Marvel Comics', desc: 'Marvel - Comics'},
    ];
}
