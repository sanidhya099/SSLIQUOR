import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {

  product: Product = {} as Product;

  constructor(
    private productService: ProductService,
    private router: Router) { }

  ngOnInit(): void {
  }

  saveProduct() {
    this.productService.addProduct(this.product).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }
}
