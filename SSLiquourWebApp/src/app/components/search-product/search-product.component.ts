import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css'] // Correct the styles property
})
export class SearchProductComponent {
  productList: Observable<Product[]>;
  filteredProductList: Observable<Product[]>;
  isVisible: boolean = false;
  searchText: string = ''; // Property to hold the input field value

  constructor(private productService: ProductService) {
    this.productList = this.productService.getAllProducts();
    this.filteredProductList = this.productList;
  }

  filterResults() {
    if (!this.searchText.trim()) {
      this.clearSearch();
      return;
    }

    this.isVisible = true;
    
    this.filteredProductList = this.productList.pipe(
      map(products => products.filter(product =>
        product.name.toLowerCase().includes(this.searchText.toLowerCase())
      ))
    );
  }

  clearSearch(): void {
    this.filteredProductList = this.productList;
    this.isVisible = false;
    this.searchText = '';
  }
}
