import { Component, OnInit } from '@angular/core';
import { Product } from 'app/shared/models';
import { ProductsService } from './../../services';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[];

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.productsService.list().subscribe((products: Product[]) => {
      this.products = products;
    });
  }

}
