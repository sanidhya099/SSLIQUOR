import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { LoginComponent } from './components/login/login.component';
import { SearchProductComponent } from './components/search-product/search-product.component';
import { ManageProductComponent } from './components/manage-product/manage-product.component';
import { ViewProductComponent } from './components/view-product/view-product.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
