# Banking Management System

A console-based **C# Banking Management System** developed to
demonstrate core Object-Oriented Programming concepts including classes,
objects, encapsulation, constructors, inheritance, polymorphism, method
overriding, static members, interfaces, collections, transactions, and
exception handling.

## Project Overview

The application simulates basic banking operations and manages:

-   Customers
-   Savings Accounts
-   Current Accounts
-   Loans
-   Transactions

The project uses inheritance to create specialized account types and
polymorphism to provide different withdrawal behavior.

## OOP Concepts Implemented

  -----------------------------------------------------------------------
  Concept                             Implementation
  ----------------------------------- -----------------------------------
  Classes & Objects                   Customer, Account, SavingsAccount,
                                      CurrentAccount, Loan

  Encapsulation                       Properties and methods

  Constructors                        Object initialization

  Inheritance                         SavingsAccount and CurrentAccount
                                      inherit from Account

  Polymorphism                        CurrentAccount overrides
                                      `Withdraw()`

  Static Members                      Total customer count

  Interfaces                          Common account operations

  Methods                             Deposit, Withdraw, Interest
                                      calculation

  Collections                         `List<T>` for application data
  -----------------------------------------------------------------------

## Classes

### Customer

Represents a bank customer.

Properties:

``` text
CustomerId
Name
City
```

A static member tracks the number of customers:

``` csharp
public static int TotalCustomers = 0;
```

The constructor initializes the customer and increments the total
customer count.

## Account

`Account` is the base class for bank accounts.

Properties:

``` text
AccountNumber
Balance
```

Methods:

``` text
Deposit()
Withdraw()
ShowBalance()
```

The withdrawal method is virtual:

``` csharp
public virtual void Withdraw(decimal amount)
```

This allows derived account classes to provide specialized behavior.

## SavingsAccount

`SavingsAccount` inherits from `Account`.

Additional property:

``` text
InterestRate
```

Additional method:

``` text
AddInterest()
```

Interest is calculated using:

``` text
Interest = Balance × InterestRate / 100
```

## CurrentAccount

`CurrentAccount` also inherits from `Account`.

Additional property:

``` text
OverdraftLimit
```

The `Withdraw()` method is overridden to support overdraft
functionality.

Example rule:

``` text
Withdrawal is allowed when:
Amount <= Balance + OverdraftLimit
```

This demonstrates polymorphism.

## Loan

The `Loan` class manages loan information.

Properties:

``` text
LoanId
CustomerId
LoanAmount
InterestRate
```

Interest is calculated using:

``` text
Interest = Loan Amount × Interest Rate / 100
```

## Customer Operations

The application supports:

-   Add customer
-   View customer details
-   View all customers
-   Count total customers

The total customer count is maintained using a static member.

## Account Operations

The application supports:

-   Create Savings Account
-   Create Current Account
-   Deposit money
-   Withdraw money
-   Check balance
-   Apply account-specific withdrawal rules

## Loan Operations

The application supports:

-   Apply for loan
-   View loan details
-   Calculate loan interest

## Transaction History

Transaction history is maintained for banking activities.

A transaction can contain:

``` text
Transaction ID
Account Number
Transaction Type
Amount
Date
Balance After Transaction
```

Transactions can be recorded for:

-   Deposits
-   Withdrawals
-   Transfers

## Transfer Between Accounts

The application supports transferring money between accounts.

The transfer process validates:

1.  Source account exists.
2.  Destination account exists.
3.  Transfer amount is valid.
4.  Source account has sufficient funds.
5.  The transaction is recorded.

## Minimum Balance Rule

A minimum balance rule can be applied to applicable accounts.

Withdrawals are rejected when they would cause the account balance to
fall below the required minimum.

## Interface

A common account contract can be defined using:

``` csharp
public interface IAccount
{
    void Deposit(decimal amount);
    void Withdraw(decimal amount);
    void ShowBalance();
}
```

This allows different account types to follow a common interface.

## Collections

The application uses generic collections for dynamic data management:

``` csharp
List<Customer>
List<Account>
List<Loan>
List<Transaction>
```

This makes it easier to add, remove, search, and manage banking records.

## Polymorphism

The base class defines:

``` csharp
public virtual void Withdraw(decimal amount)
```

The `CurrentAccount` class overrides it:

``` csharp
public override void Withdraw(decimal amount)
```

Therefore, the same method call can produce different behavior depending
on the actual account type.

## Exception Handling

The application handles invalid operations such as:

-   Invalid numeric input
-   Invalid customer ID
-   Invalid account number
-   Invalid loan ID
-   Negative amounts
-   Invalid withdrawal amounts
-   Insufficient balance
-   Overdraft limit violations
-   Minimum balance violations
-   Invalid menu choices

## Menu

``` text
===== Banking System =====
1. Add Customer
2. View Customers
3. Create Account
4. Deposit
5. Withdraw
6. Check Balance
7. Apply Loan
8. View Loans
9. Exit
```

Additional transaction and transfer options can be included depending on
the final implementation.

## Business Rules

-   Customer IDs should be unique.
-   Account numbers should be unique.
-   Loan IDs should be unique.
-   Deposit amounts must be positive.
-   Withdrawal amounts must be positive.
-   Savings accounts follow their balance rules.
-   Current accounts can use the configured overdraft limit.
-   Minimum balance rules are enforced where applicable.
-   Transfers require valid source and destination accounts.
-   Invalid operations are handled through validation and exceptions.

## Technologies Used

-   C#
-   .NET
-   Console Application
-   Object-Oriented Programming
-   Inheritance
-   Polymorphism
-   Interfaces
-   Constructors
-   Static Members
-   Generic Collections
-   `List<T>`
-   Exception Handling

## How to Run

Check the .NET SDK:

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

-   Designing classes and objects
-   Encapsulation
-   Constructors
-   Instance members
-   Static members
-   Inheritance
-   Method overriding
-   Runtime polymorphism
-   Interfaces
-   Generic collections
-   Banking business rules
-   Transaction processing
-   Exception handling
-   Menu-driven application design

## Future Enhancements

-   SQL Server database integration
-   Entity Framework Core
-   ASP.NET Core Web API
-   Authentication and authorization
-   Role-based banking access
-   Persistent transaction history
-   Unit testing
-   Logging
-   Dependency Injection
-   Repository and service layers
-   Web-based user interface

## Project Type

**Console Application \| C# \| Object-Oriented Programming Practice
Project**
