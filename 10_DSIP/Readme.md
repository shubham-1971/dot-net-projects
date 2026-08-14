# Delhivery Shipment Intelligence Platform (DSIP)

**Graduate Developer Assessment — Delhivery Engineering, Gurugram**

---

## Project Structure

```
FirstName_LastName_DSIP/
├── Delhivery.Console/       # Day 1 — C# console app (Shipment model & service)
├── Delhivery.Data/          # Day 1 — ADO.NET class library (repository layer)
├── Database/                # Day 1 — SQL Server scripts (idempotent)
├── Delhivery.API/           # Day 2 — ASP.NET Core Web API
├── UI/                      # Day 2 — index.html + style.css + app.js
├── Python/                  # Day 3 — report.py + sample CSV output
├── GenAI/                   # Day 3 — COPILOT_LOG.md + PROMPT_LOG.md + REFLECTION.md
└── README.md
```

---

## Prerequisites

| Tool | Version |
|------|---------|
| SQL Server | 2019 or later (Express is fine) |
| .NET SDK | 6.0 or later |
| Python | 3.9 or later |
| pip packages | `requests` |

---

## 1. Database Setup

**Database name used:** `DelhiveryDSIP`

### Steps

1. Open SQL Server Management Studio (SSMS) or Azure Data Studio and connect to your instance.
2. Run the scripts in this order from the `/Database/` folder:

```
DelhiveryDB.sql

```

Each script is **idempotent** — you can run them multiple times on the same database without errors.

### Verify setup

After running all scripts, execute the following to confirm seed data loaded correctly:

```sql
USE DelhiveryDSIP;
SELECT * FROM vw_ShipmentDashboard;
```

You should see 8 rows covering all 5 statuses (Booked, In Transit, Out for Delivery, Delivered, RTO).

---

## 2. Connection String

Update the connection string in the following locations before running any project:

- `Delhivery.Data/appsettings.json` (or `ShipmentRepository.cs` constant)
- `Delhivery.API/appsettings.json`

**Format:**

```
Server=YOUR_SERVER_NAME;Database=DelhiveryDSIP;User Id=YOUR_USERNAME;Password=YOUR_PASSWORD;TrustServerCertificate=True;
```

**Example (Windows Authentication):**

```
Server=localhost\SQLEXPRESS;Database=DelhiveryDB;Integrated Security=True;TrustServerCertificate=True;
```

> ⚠ Do not commit real credentials. Replace placeholder values before use.

---

## 3. Running the Console App

```bash
cd Delhivery.Console
dotnet restore
dotnet run
```

The console app demonstrates the four core operations: Book, GetAll, UpdateStatus, and Cancel — using the ADO.NET repository layer directly.

---

## 4. Running the Web API

```bash
cd Delhivery.API
dotnet restore
dotnet run
```

**Default port:** `https://localhost:5022` / `http://localhost:5001`

> If the port is different on your machine, check the console output after `dotnet run` for the actual listening URL.

### Swagger UI

Once running, open your browser and navigate to:

```
http://localhost:5022/swagger/index.html
```

All 6 endpoints are listed and testable from the Swagger UI.

### API Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/shipments` | List all shipments |
| GET | `/api/shipments/{awb}` | Track by AWB number |
| POST | `/api/shipments` | Book a new shipment |
| PUT | `/api/shipments/{awb}/status` | Update shipment status |
| DELETE | `/api/shipments/{id}` | Cancel a shipment |
| GET | `/api/shipments/stats` | Summary counts by status |

---

## 5. Running the Frontend

The UI is a single static page — no build step required.

1. Make sure the Web API is running (see step 4).
2. Open `UI/index.html` directly in your browser, **or** serve it via a simple local server:

```bash
cd UI
start index.html
# then open http://localhost:3000
```

> If you open `index.html` directly from the file system and the API is on a different port, update the `API_BASE_URL` constant at the top of `app.js` to match the actual API URL.

---

## 6. Running the Python Analytics Report

### Install dependencies

```bash
cd Python
pip install requests
```

### Run the report

```bash
python report.py
```

This calls the live API and prints the end-of-day summary to stdout. **The Web API must be running.**

### Export to CSV

```bash
python report.py --export
```

This generates a file named `delhivery_report_YYYYMMDD.csv` in the current directory.

### API offline behaviour

If the API is unreachable, the script prints:

```
ERROR: DSIP API is offline.
```

and exits with code `1`.

### Configuration

The API base URL is defined as a constant at the top of `report.py`:

```python
API_BASE_URL = "http://localhost:5022"
```

Update this if your API runs on a different port or host.

---

## 7. Gen AI Documentation

The `/GenAI/` folder contains:

| File | Contents |
|------|----------|
| `COPILOT_LOG.md` | 5 logged Copilot suggestions with ACCEPTED / MODIFIED / REJECTED outcomes |
| `PROMPT_LOG.md` | Two prompt iterations for the "In Transit > 3 days" SQL query, with reflection |
| `REFLECTION.md` | 250+ word reflection on AI usage across the project |

---

## Known Issues / Incomplete Sections

> *(Update this section honestly before submission.)*

- None at time of submission.

---

## Quick Start (TL;DR)

```bash
# 1. Run all SQL scripts against SQL Server
# 2. Update connection strings in Delhivery.Data and Delhivery.API

# Terminal 1 — start the API
cd Delhivery.API && dotnet run

# Terminal 2 — open the dashboard
open UI/index.html   # or navigate manually in browser

# Terminal 3 — run the Python report
cd Python && python report.py
```

---
