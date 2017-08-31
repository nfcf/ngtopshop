import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Product } from 'app/shared/models';
import { ProductsService } from './../../services';
import { DialogModule } from 'primeng/primeng';
import { UUID } from 'angular2-uuid';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[];

  formGroup: FormGroup;

  modal: any = {
    visible: false,
    title: ''
  }

  constructor(private productsService: ProductsService, formBuilder: FormBuilder) {
    this.formGroup = formBuilder.group({
      name: [ null, Validators.required ],
      description: [ null, Validators.required ],
      price: [ null, Validators.required ],
    });
  }

  ngOnInit() {
    this.productsService.list().subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  newProduct() {
    this.modal.title = 'New Product';
    this.modal.visible = true;
  }

  save() {
    const product = <Product>{
      name: this.formGroup.controls.name.value,
      description: this.formGroup.controls.description.value,
      price: this.formGroup.controls.price.value
    }
    this.productsService.set(UUID.UUID(), product).subscribe(
      (result) => {
        console.log(result);
      }
    );
    this.modal.visible = false;
  }

  cancel() {
    this.modal.visible = false;
  }

}
