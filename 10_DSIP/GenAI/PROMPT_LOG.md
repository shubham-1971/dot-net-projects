# PROMPT ENGINEERING LOG

## Task
Find all shipments that have been In Transit for more than 3 days

---

## Iteration 1

**Prompt:**
Write SQL query to get shipments in transit for more than 3 days

**Output:**
SELECT * 
FROM Shipments
WHERE Status = 'In Transit'
  AND DATEDIFF(DAY, BookedAt, GETDATE()) > 3;

---

## Iteration 2

**Prompt:**
Write a SQL Server query to find shipments where Status = 'In Transit' 
and they have been in transit for more than 3 days. 
Use BookedAt column and return AWBNumber, Origin, Destination, and number of days in transit.

**Output:**
SELECT 
    AWBNumber,
    Origin,
    Destination,
    DATEDIFF(DAY, BookedAt, GETDATE()) AS DaysInTransit
FROM Shipments
WHERE Status = 'In Transit'
  AND DATEDIFF(DAY, BookedAt, GETDATE()) > 3;

---

## Improvement Explanation

In Iteration 1, the query returned all columns and lacked clarity.

In Iteration 2, I refined the prompt to:
- Specify required columns
- Include calculated field (DaysInTransit)
- Make the query more useful for reporting

The second result is better because it is more readable and aligned with business needs.