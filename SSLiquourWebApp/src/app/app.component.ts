// app.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SSLiquourWebApp';

  constructor(
    private jwtHelper: JwtHelperService, 
    private router: Router,
    private storageService: StorageService // Inject the StorageService
  ) {}

  isUserAuthenticated(): boolean {
    const token = this.storageService.get("jwt");
    return token && !this.jwtHelper.isTokenExpired(token);
  }

  public logOut = (): void => {
    this.storageService.remove("jwt");
    this.router.navigate(['/login']);
  }
}
