# Flight Booking API

ASP.NET Core Web API for managing flight records using **ADO.NET, SQL Server, and Stored Procedures**.

## 📌 Project Overview

This project provides RESTful APIs for performing CRUD operations on flight records. The API communicates with SQL Server through an ADO.NET repository layer and uses stored procedures for all database operations.

## 🛠️ Technologies Used

- C#
- ASP.NET Core Web API
- ADO.NET
- SQL Server
- Stored Procedures
- Dependency Injection
- REST APIs
- JSON

## 🏗️ Architecture

```text
Client
  ↓
FlightsController
  ↓
Flight Repository
  ↓
ADO.NET
  ↓
Stored Procedures
  ↓
SQL Server
```

The project follows a layered structure:

```text
FlightBookingAPI/
│
├── Controllers/
│   └── FlightsController.cs
│
├── Models/
│   └── Flight.cs
│
├── Repositories/
│   └── FlightRepository.cs
│
├── appsettings.json
└── Program.cs
```

## 🗄️ Database

Database:

```text
FlightDB
```

### Flights Table

| Column | Data Type |
|---|---|
| FlightId | INT |
| FlightNumber | VARCHAR |
| SourceCity | VARCHAR |
| DestinationCity | VARCHAR |
| DepartureTime | DATETIME |
| Price | DECIMAL |
| AvailableSeats | INT |

## ⚙️ Stored Procedures

The application performs database operations using stored procedures:

- Get all flights
- Get flight by ID
- Insert flight
- Update flight
- Delete flight

No Entity Framework is used.

## 🔗 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/flights` | Get all flights |
| GET | `/api/flights/{id}` | Get flight by ID |
| POST | `/api/flights` | Add flight |
| PUT | `/api/flights` | Update flight |
| DELETE | `/api/flights/{id}` | Delete flight |

## 🔌 ADO.NET

The repository uses:

- `SqlConnection`
- `SqlCommand`
- `SqlDataReader`
- `ExecuteReader()`
- `ExecuteNonQuery()`

Database connections are properly managed using `using` blocks.

## 💉 Dependency Injection

The repository is registered using ASP.NET Core's built-in Dependency Injection system in `Program.cs`.

```text
Controller
    ↓
IFlightRepository
    ↓
FlightRepository
```

## 📦 JSON

The API accepts and returns flight information in JSON format.

Example:

```json
{
  "flightId": 1,
  "flightNumber": "AI101",
  "sourceCity": "Delhi",
  "destinationCity": "Mumbai",
  "departureTime": "2026-08-20T10:30:00",
  "price": 5500,
  "availableSeats": 120
}
```

## ▶️ How to Run

### 1. Configure SQL Server

Create the `FlightDB` database and execute the SQL scripts containing:

- Flights table
- Stored procedures
- Sample records

### 2. Configure Connection String

Update the SQL Server connection string in:

```text
appsettings.json
```

### 3. Run the API

```bash
dotnet restore
dotnet build
dotnet run
```

The API can then be consumed by the Console Client or tools such as Swagger/Postman.

## 🎯 Learning Outcomes

This project demonstrates:

- ASP.NET Core Web API development
- RESTful API design
- ADO.NET database connectivity
- Stored Procedures
- CRUD operations
- Dependency Injection
- Repository pattern
- JSON serialization/deserialization
- Layered architecture
- Exception handling
- Async programming
