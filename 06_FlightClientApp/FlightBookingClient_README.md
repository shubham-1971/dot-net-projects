# Flight Booking Console Client

A C# Console Application that consumes the **Flight Booking ASP.NET Core Web API** using `HttpClient`.

## 📌 Project Overview

This application provides a menu-driven interface for managing flights through REST API calls.

Instead of directly connecting to SQL Server, the client communicates with the Web API using HTTP requests.

```text
Console Application
        ↓
     HttpClient
        ↓
Flight Booking Web API
        ↓
     ADO.NET
        ↓
   SQL Server
```

## 🛠️ Technologies Used

- C#
- .NET Console Application
- HttpClient
- ASP.NET Core Web API
- REST APIs
- JSON
- JSON Serialization/Deserialization

## ✈️ Features

The application supports:

- View all flights
- Add flight
- Update flight
- Delete flight
- HTTP GET requests
- HTTP POST requests
- HTTP PUT requests
- HTTP DELETE requests
- JSON serialization
- JSON deserialization
- API response handling
- Exception handling

## 🖥️ Console Menu

```text
===== Flight Booking System =====

1. View Flights
2. Add Flight
3. Update Flight
4. Delete Flight
5. Exit
```

## 🔗 API Communication

The client communicates with the following API endpoints:

| Operation | HTTP Method | Endpoint |
|---|---|---|
| View Flights | GET | `/api/flights` |
| Get Flight | GET | `/api/flights/{id}` |
| Add Flight | POST | `/api/flights` |
| Update Flight | PUT | `/api/flights` |
| Delete Flight | DELETE | `/api/flights/{id}` |

## 📡 HttpClient

`HttpClient` is used to send HTTP requests to the Web API.

```text
Console Input
     ↓
Create Flight Object
     ↓
Serialize to JSON
     ↓
HttpClient
     ↓
Web API
     ↓
JSON Response
     ↓
Deserialize
     ↓
Display Result
```

## 🔄 CRUD Operations

### View Flights

Sends:

```text
GET /api/flights
```

and displays the returned flight records.

### Add Flight

The user enters flight details, which are converted into JSON and sent using:

```text
POST /api/flights
```

### Update Flight

Updated flight information is sent using:

```text
PUT /api/flights
```

### Delete Flight

The user provides a Flight ID and the client sends:

```text
DELETE /api/flights/{id}
```

## 📦 JSON Serialization

Flight objects are serialized before being sent to the API.

```text
C# Object
   ↓
JSON
   ↓
HTTP Request
```

API responses are deserialized back into C# objects.

```text
JSON Response
   ↓
C# Object
   ↓
Console Output
```

## ⚙️ Configuration

Update the API base URL in the client according to the URL where the Web API is running.

Example:

```text
https://localhost:xxxx/
```

The client must be running while the API is available.

## ▶️ How to Run

### 1. Start the Web API

Run the `FlightBookingAPI` project first.

### 2. Configure the API URL

Set the correct Web API base URL in the Console Client.

### 3. Run the Client

```bash
dotnet restore
dotnet build
dotnet run
```

## 🎯 Learning Outcomes

This project demonstrates:

- Consuming REST APIs using `HttpClient`
- HTTP GET, POST, PUT and DELETE
- JSON serialization
- JSON deserialization
- API-based CRUD operations
- Console application development
- Client-server architecture
- Exception handling
- Communication between a .NET client and Web API
