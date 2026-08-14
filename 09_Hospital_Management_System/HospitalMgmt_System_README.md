# Hospital Appointment & Patient Management System

## Project Walkthrough

This README provides a concise walkthrough of the **Hospital Appointment & Patient Management System** presented in the project PPT.

The system is a backend application for **City General Hospital**, built using **C#, ADO.NET, ASP.NET Core Web API, SQL Server, REST API, Dependency Injection, and Stored Procedures**. The presentation describes a system containing **14 stored procedures**. fileciteturn0file0L36-L46

## 1. System Overview

The application covers three main functional areas:

- **Patient Management** — patient registration, unique patient codes, DOB, gender, phone/email details, soft deactivation, active-patient listing, and live age calculation.
- **Doctor Management** — doctor profiles, specialization, consultation fee, availability, and filtering.
- **Appointment Booking** — booking appointments between patients and doctors, appointment status tracking, cancellation timestamp, and appointment queries. fileciteturn0file0L54-L77

## 2. Functional Requirements

### Patient Management

The system supports:

- Unique patient code
- Patient name and date of birth
- Gender
- Unique phone and email validation
- Full record updates
- Soft deactivation using an active-status flag
- Active patient listing
- Live age calculation

### Doctor Management

The system supports:

- Unique doctor code
- Doctor name
- Specialization
- Consultation fee
- Availability status
- Filtering by specialization
- Filtering by availability

### Appointment Management

The system supports:

- Booking patient-doctor appointments by date/time
- Rejecting bookings when the doctor is unavailable
- Scheduled, Completed, and Cancelled statuses
- Recording cancellation time
- Upcoming appointment queries
- Doctor-specific appointment queries

### Reporting

The project also includes:

- Consolidated appointment details
- Doctors with more than two appointments
- Revenue by medical specialization
- Duplicate appointment detection
- Appointments within the next seven days fileciteturn0file0L83-L139

## 3. Database Design

The SQL Server database contains three main entities:

### Patients

- PatientId — Primary Key
- PatientCode — Unique
- FullName
- DateOfBirth
- Gender
- Phone — Unique
- Email — Unique where provided
- IsActive

### Doctors

- DoctorId — Primary Key
- DoctorCode — Unique
- FullName
- Specialization
- Phone — Unique
- ConsultationFee
- IsAvailable

### Appointments

- AppointmentId — Primary Key
- PatientId — Foreign Key
- DoctorId — Foreign Key
- AppointmentDateTime
- Status
- CancelledAt

The database design uses stored procedures for operations, transactional appointment booking, referential integrity, soft deletion, and indexes related to doctor/date queries. fileciteturn0file0L145-L200

## 4. Stored Procedures

The project contains **14 stored procedures** grouped by functionality.

### Patient Procedures

- `sp_AddPatient`
- `sp_UpdatePatient`
- `sp_DeactivatePatient`
- `sp_GetActivePatients`

### Doctor Procedures

- `sp_GetDoctorsByFilter`

### Appointment Procedures

- `sp_AddAppointment`
- `sp_CancelAppointment`
- `sp_GetUpcomingAppointments`
- `sp_GetAppointmentsByDoctor`

### Reporting Procedures

- `sp_GetAppointmentDetails`
- `sp_GetDoctorsWithMoreAppointments`
- `sp_GetRevenueBySpecialization`
- `sp_GetDuplicateAppointments`
- `sp_GetNext7DaysAppointments` fileciteturn0file0L209-L233

## 5. REST API

The ASP.NET Core Web API exposes endpoints for the main operations.

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/patients` | Register patient |
| PUT | `/api/patients/{id}` | Update patient |
| DELETE | `/api/patients/{id}/deactivate` | Soft-deactivate patient |
| GET | `/api/patients` | Get active patients with age |
| GET | `/api/doctors?spec=&available=` | Filter doctors |
| POST | `/api/appointments` | Book appointment |
| PUT | `/api/appointments/{id}/cancel` | Cancel appointment |
| GET | `/api/appointments/upcoming` | Get upcoming appointments |
| GET | `/api/appointments/doctor/{id}` | Get appointments by doctor |
| GET | `/api/reports/consolidated` | Get consolidated report |

The API contract uses appropriate HTTP status responses for successful creation, no-content operations, validation failures, missing records, conflicts, and server errors. fileciteturn0file0L239-L309

## 6. Architecture

The project follows a layered architecture:

```text
Presentation
    ↓
API Layer
    ↓
Domain Layer
    ↓
Data Access Layer
    ↓
SQL Server
```

The presentation layer can include Postman, API clients, and Swagger. The API layer contains ASP.NET Core Web API controllers, middleware, and global logging. The domain layer contains models, interfaces, typed exceptions, and business logic. The data-access layer uses ADO.NET, repository patterns, interfaces, and stored procedures. fileciteturn0file0L317-L337

## 7. Technical Highlights

### Dependency Injection

Services are resolved using Dependency Injection, with repository interfaces injected into controllers.

### Transaction Safety

Appointment booking is handled using a SQL transaction. If the doctor is unavailable, the operation is rolled back.

### Domain Logic

Age calculation, status checks, and schedule formatting are handled in the domain model.

### Global Middleware

Global middleware logs the HTTP method, request path, and response time.

### Structured Errors

Typed domain exceptions are used and unhandled errors return structured responses without exposing internal details.

### Input Validation

Payloads are validated before database interaction, with uniqueness enforced at both application and database levels. fileciteturn0file0L344-L375

## 8. HTTP Status Codes

The API follows the status-code contract described in the project:

| Status | Meaning |
|---|---|
| 201 | Resource successfully created |
| 204 | Operation completed with no response body |
| 400 | Invalid payload or business-rule failure |
| 404 | Requested entity not found |
| 409 | Duplicate/conflicting entity data |
| 500 | Structured server error |

Examples include duplicate phone/email/entity codes, invalid dates, unavailable resources, and missing patients, doctors, or appointments. fileciteturn0file0L381-L407

## 9. Technology Stack

- **C# / .NET** — Programming language and platform
- **ASP.NET Core** — API framework
- **ADO.NET** — Data access
- **SQL Server** — Database
- **Postman** — API testing fileciteturn0file0L419-L432

## 10. Project Deliverables

The presentation lists the following project deliverables:

- Working application running locally
- Complete source code
- SQL script containing the schema, 14 stored procedures, and sample data
- Postman collection for the API endpoints
- Project documentation containing structure, setup steps, and assumptions fileciteturn0file0L433-L444

## Conclusion

The Hospital Appointment & Patient Management System demonstrates a layered ASP.NET Core backend that combines **REST APIs, ADO.NET, SQL Server, stored procedures, dependency injection, transactional appointment booking, validation, structured error handling, and reporting**.

This README is intentionally a walkthrough of the contents presented in the project documentation rather than an expanded implementation guide.
