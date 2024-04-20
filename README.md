Creating a comprehensive README.md file for your Angular frontend and .NET backend application can significantly improve how users and developers interact with your project. Below is a detailed tutorial template that you can adjust based on the specifics of your application.

### README.md Template for Your Angular + .NET Project

---

# Liquor Store Management System

Welcome to the Liquor Store Management System, a full-stack application designed to streamline the process of managing liquor inventories, sales, and customer interactions. This project utilizes Angular for the frontend and .NET Core for the backend, providing a robust, scalable, and user-friendly platform.

## Features

- **Product Management**: Add, edit, and delete products.
- **Search and Filter**: Dynamically search and filter products.
- **User Authentication**: Secure login/logout functionality with JWT.

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- [.NET 7 SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/en/) (which includes npm)
- [Angular CLI](https://cli.angular.io/)
- [Visual Studio](https://visualstudio.microsoft.com/) and [VS Code](https://code.visualstudio.com/)

## Getting Started

### Setup the Backend

1. **Clone the repository**
   ```bash
   git clone https://github.com/DMIT-2015/dmit2015-1232-a01-courseproject-sanidhya099.git
   cd dmit2015-1232-a01-courseproject-sanidhya099
   ```

2. **Navigate to the backend directory**
   ```bash
   cd SSLiquour
   ```

3. **Restore dependencies**
   ```bash
   dotnet restore
   ```

4. **Run the application**
   ```bash
   dotnet run
   ```
   This will start the server on `http://localhost:7250/`.

### Setup the Frontend

1. **Navigate to the frontend directory**
   ```bash
   cd ../SSLiquourWebApp
   ```

2. **Install NPM packages**
   ```bash
   npm install
   ```

3. **Serve the application**
   ```bash
   ng serve
   ```
   This will launch the Angular app on `http://localhost:4200/`.

## Usage

- Navigate to `http://localhost:4200/` in your web browser to start using the application.
- Log in with provided credentials to access the management functionalities.


## Run Application with 
 UserName - sharmas ,
 Password - string123


## References

# FrontEnd
https://javascript.plainenglish.io/jwt-token-authentication-in-angular-14-and-net-core-6-web-api-c3237cb4204

# BackEnd
https://github.com/DMIT-2015/dmit2015-1232-a01-courseproject-sanidhya099.git



## Creating a C# REST API with JWT Authentication and CRUD Operations:

Understanding REST Principles: Developing a RESTful API involves understanding and implementing the principles of Representational State Transfer (REST), including resource identification through URI, uniform interface, statelessness, and more.

C# for Backend Development: Leveraging C# for backend development offers robustness and scalability. Its object-oriented nature facilitates modular and maintainable code, crucial for complex applications.

JWT Authentication: Implementing JSON Web Token (JWT) authentication provides a secure means of user authentication and authorization. Understanding how to generate, validate, and use JWT tokens enhances API security and user privacy.

CRUD Operations: CRUD (Create, Read, Update, Delete) operations are fundamental in database management. Implementing these operations in the API allows seamless interaction with the underlying data store, enabling users to manipulate resources effectively.

Endpoint Design: Designing intuitive and consistent RESTful endpoints simplifies API consumption and enhances developer experience. Well-defined endpoints adhere to REST conventions, making the API predictable and easy to understand.

Error Handling: Effective error handling is essential for robust API design. Implementing meaningful error responses and status codes improves API usability and aids in troubleshooting.
Testing and Documentation: Thoroughly testing API endpoints ensures functionality and reliability. Additionally, comprehensive documentation, including endpoint descriptions and usage examples, facilitates API adoption and integration by other developers.

Security Considerations: Alongside JWT authentication, implementing additional security measures such as input validation, rate limiting, and HTTPS encryption enhances API security and protects against common vulnerabilities.
Scalability and Performance: Designing the API with scalability and performance in mind ensures it can handle increased traffic and data volume efficiently. Utilizing caching mechanisms, optimizing database queries, and employing asynchronous programming techniques contribute to improved scalability and performance.
Continuous Learning: The journey of building a RESTful API is an ongoing learning process. Keeping abreast of industry best practices, exploring new technologies, and seeking feedback from peers contribute to continual improvement and growth as a developer.


In conclusion, creating a C# REST API with JWT authentication and CRUD operations is a multifaceted endeavor that encompasses various aspects of software development. Mastering these skills not only enables the development of robust and secure APIs but also fosters continuous learning and improvement in the field of backend development.

## Storing Data in Database using SQL SERVER (JWT Context) 

  public class JwtContext: DbContext
  {
      public JwtContext(DbContextOptions<JwtContext> options): base(options)
      {
      
      }

      public DbSet<User> Users { get; set; }
      public DbSet<Liquor> Liquors { get; set; }
  }

## Connection To Database

  {
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "Database": "server=LIBLONG-401;Database=SSLiquor;Trusted_Connection=SSPI;Encrypt=false;TrustServerCertificate=true;"
  },
  "Jwt": {
    "Key": "Yh2k7QSu4l8CZg5p6X3Pna9L0Miy4D3Bvt0JVr87UcOj69Kqw5R2Nmf4FWs03Hdx",
    "Issuer": "JWTAuthenticationServer",
    "Audience": "JWTServicePostmanClient",
    "Subject": "JWTServiceAccessToken"
  }
}


## JWT Token Generation and Authentication

 public class AuthService : IAuthService
 {

     private readonly JwtContext _jwtContext;



     private readonly IConfiguration _configuration;

     public AuthService(JwtContext jwtContext , IConfiguration configuration)
     {
         _jwtContext = jwtContext;
         _configuration = configuration;
     }
     public User AddUser(User user)
     {
         var adduser = _jwtContext.Add(user);    
         _jwtContext.SaveChanges();
         return adduser.Entity;
     }

     public string Login(LoginRequest loginRequest)
     {
         if (loginRequest.UserName != null && loginRequest.Password != null)
         {
             var user = _jwtContext.Users.FirstOrDefault(s => s.Email == loginRequest.UserName && s.Password == loginRequest.Password);
             if (user != null)
             {
                 var claims = new[] {
                     new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                     new Claim("Id", user.ID.ToString()),
                     new Claim("UserName", user.Name),
                     new Claim("Email", user.Email)
                 };
                 var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                 var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                 var token = new JwtSecurityToken(
                     _configuration["Jwt:Issuer"],
                     _configuration["Jwt:Audience"],
                     claims,
                     expires: DateTime.UtcNow.AddMinutes(10),
                     signingCredentials: signIn);

                 var jwtToken = new JwtSecurityTokenHandler().WriteToken(token);
                 return jwtToken;
             }
             else
             {
                 throw new Exception("user is not valid");
             }
         }
         else
         {
             throw new Exception("credentials are not valid");
         }
     }
 }

## LIQUOR CRUD SERVICE

public class LiquorService : ILiquorService
{

    private readonly JwtContext _jwtContext;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public LiquorService(JwtContext jwtContext, IHttpContextAccessor httpContextAccessor)
    {
        _jwtContext = jwtContext;
        _httpContextAccessor = httpContextAccessor;
    }

    public int GetCurrentUserId()
    {
        var userIdValue = _httpContextAccessor.HttpContext.User.FindFirst("Id")?.Value;

        if (int.TryParse(userIdValue, out int userId))
        {
            return userId;
        }
        // Handle the case where userId is not a valid integer
        // Log the error or handle it according to your application's needs
        throw new InvalidOperationException("User ID is not in a valid format or is missing.");
    }


    public Liquor AddLiquor(Liquor liquor)
    {

        liquor.UserID = GetCurrentUserId();
        var liq = _jwtContext.Liquors.Add(liquor);
        _jwtContext.SaveChanges();
        return liq.Entity;
    }

    public bool DeleteLiquor(int id)
    {
        try
        {

            int userId = GetCurrentUserId();
            var liq = _jwtContext.Liquors.SingleOrDefault(l => l.Id == id && l.UserID == userId);
        if (liq == null)
            throw new Exception("User Not Found");
        else
        {
            _jwtContext.Liquors.Remove(liq);
            _jwtContext.SaveChanges();
            return true;
        }
        } catch (Exception ex)
        {
            return false;
        }
    }

    public Liquor GetLiquor(int id)
    {
        int userId = GetCurrentUserId();
        var liq = _jwtContext.Liquors.SingleOrDefault(l => l.Id == id && l.UserID == userId);
        return liq;
    }

    public List<Liquor> GetLiquorDetails()
    {
        // Try to get the user ID, but do not throw an exception if it's not present
        var userIdValue = _httpContextAccessor.HttpContext.User.FindFirst("Id")?.Value;
        int userId;
        if (!int.TryParse(userIdValue, out userId))
        {
            // Return all liquors if there is no valid user ID (e.g., user not logged in)
            return _jwtContext.Liquors.ToList();
        }

        // Return only the liquors that belong to the logged-in user
        return _jwtContext.Liquors.Where(l => l.UserID == userId).ToList();
    }


    public Liquor UpdateLiquor(Liquor liquor)
    {
        int userId = GetCurrentUserId();
        var existingLiquor = _jwtContext.Liquors.SingleOrDefault(l => l.Id == liquor.Id && l.UserID == userId);
        if (existingLiquor == null)
            throw new Exception("Liquor not found or not authorized to update.");
        existingLiquor.Name = liquor.Name;
        existingLiquor.brand = liquor.brand;
        existingLiquor.category = liquor.category;
        existingLiquor.abv = liquor.abv;
        existingLiquor.volume = liquor.volume;
        existingLiquor.CountryOfOrigin = liquor.CountryOfOrigin;
        existingLiquor.stockAmount = liquor.stockAmount;
        existingLiquor.Price = liquor.Price;
        existingLiquor.UserID = userId;


        _jwtContext.Liquors.Update(existingLiquor);
        _jwtContext.SaveChanges();
        return existingLiquor;
    }
}

## LIQUOR CONTROLLER Using RestAPI EndPoints

public class LiquorController : ControllerBase
{
    private readonly ILiquorService _liquorService;

    public LiquorController(ILiquorService liquorService)
    {
        _liquorService = liquorService;
    }

    [HttpGet()]
    public ActionResult<List<Liquor>> GetAllLiquors()
    {
        return _liquorService.GetLiquorDetails();
    }

    [HttpPost()]
    public ActionResult<Liquor> CreateLiquor([FromBody] Liquor liquor)
    {
        return _liquorService.AddLiquor(liquor);
    }

    [HttpPut("{id}")]
    public ActionResult<Liquor> UpdateLiquor(int id, [FromBody] Liquor liquor)
    {
        liquor.Id = id;
        return _liquorService.UpdateLiquor(liquor);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteLiquor(int id)
    {
        if (_liquorService.DeleteLiquor(id))
            return Ok();
        else
            return NotFound();
    }

    [HttpGet("{id}")]
    public ActionResult<Liquor> GetLiquorById(int id)
    {
        var liquor = _liquorService.GetLiquor(id);
        if (liquor != null)
            return liquor;
        else
            return NotFound();
    }
}

## Using Angular CLI for Frontend Development

Angular CLI Basics: Mastering Angular CLI commands for generating components, services, modules, and other artifacts is fundamental for efficient frontend development. Understanding the project structure and workflow streamlines the development process.

Component-Based Architecture: Embracing Angular's component-based architecture facilitates modular and reusable code. Breaking down the user interface into components enhances maintainability and scalability while promoting code organization and separation of concerns.

HTTP Client Module: Leveraging Angular's built-in HTTP client module simplifies data fetching from backend endpoints. Understanding how to make HTTP requests, handle responses, and manage asynchronous operations ensures seamless integration with backend APIs.

Observables and RxJS: Embracing Observables and RxJS operators enables reactive programming paradigms within Angular applications. Utilizing features like map, filter, and mergeMap enhances data manipulation and facilitates complex data transformations.

Template Syntax and Data Binding: Mastering Angular's template syntax and data binding mechanisms enables dynamic and interactive user interfaces. Understanding interpolation, property binding, event binding, and two-way binding facilitates seamless data flow between components and templates.

Angular Material: Integrating Angular Material components enhances the aesthetics and functionality of web applications. Leveraging pre-built UI components such as buttons, cards, tables, and dialogs accelerates frontend development while maintaining a consistent design language.

Responsive Design and Flex Layout: Implementing responsive design principles using Angular Flex Layout ensures optimal viewing experiences across various devices and screen sizes. Utilizing flexbox-based layouts enables flexible and adaptive user interfaces without relying on external CSS frameworks.

Error Handling and Loading States: Implementing error handling mechanisms and loading states enhances user experience when fetching data from endpoints. Displaying meaningful error messages and loading indicators communicates application status effectively and improves usability.

Optimizing Performance: Optimizing frontend performance through techniques like lazy loading, code splitting, and Ahead-of-Time (AOT) compilation enhances website speed and responsiveness. Minimizing bundle sizes, reducing HTTP requests, and optimizing rendering performance contribute to improved user experience.

Continuous Learning and Community Engagement: The journey of frontend development with Angular CLI is an ongoing learning process. Engaging with the Angular community, exploring new features and best practices, and staying updated with the latest advancements in web technologies foster continuous improvement and growth as a developer.

## Fetching API in FRONT-END

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import configurl from '../../assets/config/config.json';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = configurl.apiServer.url + '/api/Liquor';

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }

  addProduct(productData: Product): Observable<Product> {
    return this.http.post<Product>(this.url, productData, {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    });
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.url}/${product.id}`, product, {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    });
  }
  
  deleteProductById(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.url}/${id}`);
  }
}


##  Handling Click Event Listeners to post Data to Secured RestAPI 

-- FOR SAVE
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

## FOR LOGIN THE WEBAPP

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import configurl from '../../../assets/config/config.json';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  invalidLogin?: boolean;

  url = configurl.apiServer.url + '/api/Auth';

  constructor(private router: Router, private http: HttpClient,private jwtHelper : JwtHelperService) { }

  public login = (form: NgForm) => {
    const credentials = JSON.stringify(form.value);

    this.http.post(this.url, credentials, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
        const token = (<any>response).token;
        if (token) {
          localStorage.setItem("jwt", token);
          this.invalidLogin = false;
          this.router.navigate(["/products"]);
        } else {
          alert("Token not found in response.");
        }
      }, err => {
        this.invalidLogin = true;
      });
    
  }

  isUserAuthenticated() {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  } 

}

## FOR EDIT PRODUCT

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


## FOR SEARCH PRODUCT

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

## FOR VIEW PRODUCT

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



## API Endpoints

Document the key API endpoints with examples:

| Method | Endpoint             | Description                   |
|--------|----------------------|-------------------------------|
| GET    | `/api/Liquor`        | Retrieves all products.       |
| POST   | `/api/Liquor`        | Adds a new product.           |
| PUT    | `/api/Liquor/{id}`   | Updates an existing product.  |
| DELETE | `/api/Liquor/{id}`   | Deletes a product.            |
| GET    | `/api/Liquor/{id}`   | Retrieves product by Id.      |
