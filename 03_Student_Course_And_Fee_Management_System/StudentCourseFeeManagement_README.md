# Student Course & Fee Management System

A console-based **C# Student Course & Fee Management System** developed
to practice generic collections, `List<T>`, CRUD operations, LINQ,
searching, filtering, fee calculations, reporting, validation, and
exception handling.

## Project Overview

This application manages:

-   Courses
-   Students
-   Course enrollment
-   Student fees
-   Fee payments
-   Admission dates
-   Search and reporting operations

The project uses **generic collections (`List<T>`)** instead of
fixed-size arrays, allowing the application to dynamically manage
records.

## Features

### Course Management

-   Add course
-   View all courses
-   Delete course
-   Validate unique course IDs
-   Prevent deletion when students are enrolled

### Student Management

-   Add student
-   View all students
-   Update student
-   Delete student
-   Assign students to existing courses
-   Automatically assign course fee
-   Store admission date

### Fee Management

-   Store total course fee
-   Store fee paid
-   Automatically calculate fee due
-   Prevent fee paid from exceeding total fee
-   Find students with pending fees
-   Identify students who have paid the full fee

### Search and Filtering

-   Search student by name
-   Search students by course
-   Search students with fee due
-   Search students by admission month

### Reports

-   Course-wise student count
-   Monthly revenue
-   Students who paid full fee
-   Top 3 students based on fee paid
-   Total revenue collected

## Classes

### Course

``` csharp
public class Course
{
    public int CourseId { get; set; }
    public string CourseName { get; set; }
    public decimal Fee { get; set; }
}
```

### Student

``` csharp
public class Student
{
    public int StudentId { get; set; }
    public string Name { get; set; }
    public string CourseName { get; set; }
    public decimal TotalFee { get; set; }
    public decimal FeePaid { get; set; }
    public DateTime AdmissionDate { get; set; }
}
```

## Data Storage

The project uses generic collections:

``` csharp
List<Course> courses = new List<Course>();
List<Student> students = new List<Student>();
```

Unlike fixed-size arrays, `List<T>` dynamically grows as records are
added.

## Student Admission

When adding a student:

1.  Enter student ID.
2.  Enter student name.
3.  Select an existing course.
4.  Automatically assign the course fee.
5.  Enter fee paid.
6.  Store admission date.
7.  Validate the information.

## Fee Calculation

The pending fee is calculated as:

``` text
Fee Due = Total Fee - Fee Paid
```

Students with pending payments can be identified using:

``` csharp
students.Where(s => s.TotalFee - s.FeePaid > 0)
```

## LINQ Features

The project uses LINQ for searching, filtering, sorting, and
aggregation.

### Search by Name

``` csharp
students.Where(s => s.Name.Contains(name))
```

### Search by Course

``` csharp
students.Where(s => s.CourseName == courseName)
```

### Search by Admission Month

``` csharp
students.Where(s => s.AdmissionDate.Month == month)
```

### Students Who Paid Full Fee

``` csharp
students.Where(s => s.FeePaid == s.TotalFee)
```

### Top 3 Students by Fee Paid

``` csharp
students
    .OrderByDescending(s => s.FeePaid)
    .Take(3);
```

### Total Revenue

``` csharp
students.Sum(s => s.FeePaid)
```

## CRUD Operations

### Create

Courses and students can be added using menu-driven input.

### Read

All courses and students can be displayed.

### Update

Student details and fee payments can be updated.

### Delete

Students can be removed.

Courses can only be removed when no students are enrolled in them.

## Reports

### Course-wise Student Count

Example:

``` text
Course             Student Count
--------------------------------
C#                         15
Python                     20
Data Engineering           12
```

### Monthly Revenue

The application can calculate revenue collected based on admission
month.

## Business Rules Implemented

-   Student ID must be unique.
-   Course ID must be unique.
-   A course must exist before assigning it to a student.
-   `FeePaid` cannot exceed `TotalFee`.
-   Fee due is calculated automatically.
-   A course cannot be deleted while students are enrolled.
-   Invalid input is handled.
-   Invalid IDs are handled.
-   Exception handling is implemented.

## Menu

``` text
===== Student Course Management =====
1. Add Course
2. Add Student
3. View All Students
4. View All Courses
5. Update Student
6. Delete Student
7. Search Student by Name
8. Search by Course
9. Search Students with Fee Due
10. Search by Admission Month
11. Exit
```

## Technologies Used

-   C#
-   .NET
-   Console Application
-   Classes and Objects
-   Generic Collections
-   `List<T>`
-   LINQ
-   `DateTime`
-   CRUD Operations
-   Exception Handling

## How to Run

Check the .NET SDK:

``` bash
dotnet --version
```

Run the application:

``` bash
dotnet run
```

Build the project:

``` bash
dotnet build
```

## Learning Outcomes

Through this project, I practiced:

-   Creating and using classes
-   Working with generic collections
-   Using `List<T>`
-   Implementing CRUD operations
-   Writing LINQ queries
-   Filtering and searching data
-   Sorting data
-   Aggregating data using `Sum()`
-   Working with dates
-   Generating reports
-   Implementing business rules
-   Handling exceptions
-   Building menu-driven applications

## Future Enhancements

-   Use separate `CourseId` reference instead of storing `CourseName`
-   Add payment transaction history
-   Store data in SQL Server
-   Add Entity Framework Core
-   Add authentication
-   Build an ASP.NET Core Web API
-   Add a web-based UI
-   Add unit tests

## Project Type

**Console Application \| C# \| Collections + LINQ Practice Project**
