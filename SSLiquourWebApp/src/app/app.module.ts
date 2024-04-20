import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchProductComponent } from './components/search-product/search-product.component';
import { ViewProductComponent } from './components/view-product/view-product.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ManageProductComponent } from './components/manage-product/manage-product.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { JwtModule } from "@auth0/angular-jwt";
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/search-product', pathMatch: 'full' },
  { path: 'search-product', component: SearchProductComponent, title: 'Liquor by SS : Home'},
  { path: 'products', component: ViewProductComponent, title: 'Liquor by SS : Our Products'},
  { path: 'add-product', component: AddProductComponent, title: 'Liquor by SS : Add Product', canActivate: [AuthGuard]},
  { path: 'manage-products/:id', component: ManageProductComponent, title: 'Liquor by SS : Manage Products', canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent, title: 'Liquor by SS : Login'},
];

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    SearchProductComponent,
    ViewProductComponent,
    AddProductComponent,
    ManageProductComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:7250"],
        disallowedRoutes: []
      }
    }),
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
