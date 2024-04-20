import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrl: './manage-product.component.css'
})

export class ManageProductComponent implements OnInit {

  product: Product = {} as Product;

  constructor(
    private formbulider: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params  => {
      const id = params.get('id');
      console.log("id = "+id)
      if (id) {
        this.productService.getAllProducts().subscribe(data => {
          this.product = data.find(s => s.id.toString() === id)!;
        });
      }
    });
  }

  editProduct() {
    if (this.product.id) {
      this.productService.updateProduct(this.product).subscribe(() => {
        this.router.navigate(['/products']);
      }, (error) => {
        alert(error);
      });
    }
  }
}
