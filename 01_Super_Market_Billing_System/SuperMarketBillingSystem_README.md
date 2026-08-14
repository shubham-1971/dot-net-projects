# Super Market Billing System

A console-based **C# Super Market Billing System** developed to practice
classes, properties, fixed-size arrays, CRUD operations, role-based
menus, cart management, product searching, stock validation, and billing
calculations.

## Project Overview

This application simulates a basic supermarket billing system with two
roles:

-   **Admin / Manager** -- manages products and performs product
    searches.
-   **User / Customer** -- manages customers, shopping cart, and
    billing.

The project intentionally uses **arrays instead of generic collections**
to practice array-based data management and CRUD operations.

## Features

### Admin / Product Management

-   Add product
-   View all products
-   Update product price and quantity
-   Delete product
-   Search product by name
-   Search products by price range
-   View low-stock products
-   Validate unique product codes
-   Handle array capacity

### Customer Management

-   Add customer
-   View customers
-   Update customer
-   Delete customer

### Shopping Cart

-   Add product to cart using product code
-   Validate requested quantity against available stock
-   Remove product from cart
-   View cart
-   Calculate item amount automatically

### Billing

-   Calculate `Price × Quantity`
-   Calculate total bill amount
-   Display formatted bill
-   Validate cart and product information
-   Optionally reduce stock after billing

## Classes

### Product

``` csharp
public class Product
{
    public int ProductCode { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public int Quantity { get; set; }
}
```

### Customer

``` csharp
public class Customer
{
    public int CustomerId { get; set; }
    public string Name { get; set; }
}
```

### CartItem

``` csharp
public class CartItem
{
    public int ProductCode { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public int Quantity { get; set; }

    public decimal Amount => Price * Quantity;
}
```

## Data Storage

The project uses fixed-size arrays:

``` csharp
Product[] products = new Product[100];
Customer[] customers = new Customer[50];
CartItem[] cart = new CartItem[50];
```

Counters are maintained for the active records:

``` csharp
int productCount = 0;
int customerCount = 0;
int cartCount = 0;
```

## CRUD Implementation

### Create

Products and customers can be added to their respective arrays after
validation.

### Read

All products, customers, and cart items can be displayed through menu
options.

### Update

Products and customers can be updated using their respective IDs/codes.

### Delete

Array elements are removed and the remaining elements are shifted to
close the gap.

Example:

``` text
Before:
P1 P2 P3 P4

Delete P2

After:
P1 P3 P4
```

## Product Search

### Search by Name

Products can be searched using the product name.

### Search by Price Range

Products can be filtered between a minimum and maximum price.

### Low Stock

Products with:

``` text
Quantity < 5
```

are displayed as low-stock products.

## Cart and Billing Logic

For each cart item:

``` text
Amount = Price × Quantity
```

The final bill is:

``` text
Total Bill = Sum of all Cart Item Amounts
```

Example:

``` text
========= BILL =========
Product       Qty    Price    Amount
Milk           2       50       100
Rice           1       80        80
-------------------------------------
Total Bill Amount: 180
=========================
```

## Business Rules Implemented

-   Product code must be unique.
-   Customer ID must be unique.
-   Cart quantity cannot exceed available stock.
-   Array overflow is handled.
-   Invalid input is validated.
-   Invalid product/customer codes are handled.
-   Empty data conditions are handled.
-   Array elements are shifted after deletion.

## Menu

### Main Menu

``` text
===== Super Market Billing System =====
1. Admin Login
2. User Menu
3. Exit
```

### Admin Menu

``` text
1. Add Product
2. View Products
3. Update Product
4. Delete Product
5. Search Product by Name
6. Search by Price Range
7. Low Stock Products
8. Back
```

### User Menu

``` text
1. Add Customer
2. View Customers
3. Update Customer
4. Delete Customer
5. Add to Cart
6. Remove from Cart
7. View Cart
8. Generate Bill
9. Back
```

## Technologies Used

-   C#
-   .NET
-   Console Application
-   Classes and Objects
-   Properties
-   Fixed-size Arrays
-   CRUD Operations

## How to Run

Make sure the .NET SDK is installed.

Check the installation:

``` bash
dotnet --version
```

Run the project:

``` bash
dotnet run
```

Build the project:

``` bash
dotnet build
```

## Learning Outcomes

Through this project, I practiced:

-   Creating classes and objects
-   Using properties
-   Working with fixed-size arrays
-   Implementing CRUD operations manually
-   Searching and filtering array data
-   Deleting array elements by shifting
-   Managing shopping carts
-   Implementing billing calculations
-   Validating business rules
-   Building menu-driven console applications

## Future Enhancements

-   Replace arrays with `List<T>`
-   Add discount calculation
-   Add GST calculation
-   Store multiple bills
-   Add invoice numbers
-   Persist data using SQL Server
-   Convert the application into an ASP.NET Core Web API

## Project Type

**Console Application \| C# \| Beginner / Intermediate Practice
Project**
