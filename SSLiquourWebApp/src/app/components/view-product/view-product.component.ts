import { Component, OnInit } from '@angular/core'; // Correct the import for OnInit
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router'; // Ensure this import is from '@angular/router', not 'express'
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']  // Corrected from 'styleUrl' to 'styleUrls'
})
export class ViewProductComponent implements OnInit {  // Implement OnInit

  productList: Product[]; // Changed from Observable<Product[]> to Product[]

  constructor(
    private productService: ProductService,  // Inject using constructor, not with inject() method
    private jwtHelper: JwtHelperService, 
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  private getAllProducts(): void {
    this.productService.getAllProducts().subscribe(data => {
      this.productList = data; 
    }, error => {
      console.error('Failed to get products', error);
    });
  }

  isUserAuthenticated(): boolean {
    const token = this.storageService.get("jwt");
    return token && !this.jwtHelper.isTokenExpired(token);
  }

  deleteProduct(id: number): void {
    if(confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProductById(id).subscribe(() => {
        this.getAllProducts(); // Refresh the list after deleting
      }, error => {
        console.error('Failed to delete product', error);
      });
    }
  }
}
