-- Database
IF NOT EXISTS (SELECT 1 FROM sys.databases WHERE NAME = 'DelhiveryDB')
BEGIN
	CREATE DATABASE DelhiveryDB
END

-- use DB
USE DelhiveryDB
GO


-- Table
IF not exists (SELECT 1 FROM sys.tables WHERE NAME = 'Shipments')
BEGIN
	CREATE TABLE dbo.Shipments(
	ShipmentId INT PRIMARY KEY IDENTITY(101,1),
	AWBNumber NVARCHAR(20) NOT NULL UNIQUE,
	SenderName NVARCHAR(100) NOT NULL,
	ReceiverName NVARCHAR(100) NOT NULL,
	Origin NVARCHAR(100) NOT NULL,
	Destination  NVARCHAR(100) NOT NULL,
	WeightKg DECIMAL(8,2) NOT NULL CHECK (WeightKg > 0),
	Status NVARCHAR(30) NOT NULL DEFAULT 'Booked' CHECK (Status IN ('Booked',  'In Transit',  'Out for Delivery',  'Delivered',  'RTO')),
	BookedAt DATETIME NOT NULL DEFAULT GETDATE(),
	DeliveredAt DATETIME NULL 
	)
END
GO

-- Seed Data

IF NOT EXISTS (SELECT 1 FROM dbo.Shipments)
BEGIN
INSERT INTO dbo.Shipments
(AWBNumber, SenderName, ReceiverName, Origin, Destination, WeightKg, Status, BookedAt, DeliveredAt)
VALUES
('DEL2025001','Rahul Sharma','Anjali Verma','Hyderabad','Bengaluru',2.50,'Booked',
DATEADD(DAY,-1,GETDATE()),NULL),

('DEL2025002','Amit Kumar','Sneha Reddy','Chennai','Mumbai',4.20,'Booked',
DATEADD(DAY,-2,GETDATE()),NULL),

('DEL2025003','Ravi Teja','Pooja Singh','Delhi','Pune',1.75,'In Transit',
DATEADD(DAY,-3,GETDATE()),NULL),

('DEL2025004','Kiran Rao','Neha Gupta','Ahmedabad','Jaipur',3.10,'In Transit',
DATEADD(DAY,-4,GETDATE()),NULL),

('DEL2025005','Vikram Patel','Divya Sharma','Lucknow','Kolkata',5.60,'Out for Delivery',
DATEADD(DAY,-2,GETDATE()),NULL),

('DEL2025006','Arjun Mehta','Priya Nair','Nagpur','Hyderabad',2.90,'Delivered',
DATEADD(DAY,-5,GETDATE()),
DATEADD(DAY,-1,GETDATE())),

('DEL2025007','Suresh Babu','Lakshmi Devi','Visakhapatnam','Vijayawada',7.40,'Delivered',
DATEADD(DAY,-6,GETDATE()),
DATEADD(DAY,-2,GETDATE())),

('DEL2025008','Rohit Jain','Megha Kapoor','Surat','Delhi',6.30,'RTO',
DATEADD(DAY,-7,GETDATE()),NULL);
END
GO

-- Stored Procedures

-- usp_GetAllShipments

CREATE OR ALTER PROCEDURE dbo.usp_GetAllShipments
AS
BEGIN
SELECT 
ShipmentId, AWBNumber, SenderName, ReceiverName, Origin, Destination, WeightKg, Status, BookedAt, DeliveredAt
FROM dbo.Shipments
ORDER BY BookedAt DESC
END
GO

-- usp_GetShipmentByAWB (AWBNumber)
CREATE OR ALTER PROCEDURE dbo.usp_GetShipmentByAWB @AWBNumber NVARCHAR(20)
AS
BEGIN
SELECT 
ShipmentId, AWBNumber, SenderName, ReceiverName, Origin, Destination, WeightKg, Status, BookedAt, DeliveredAt
FROM dbo.Shipments
WHERE AWBNumber = @AWBNumber
END
GO

-- usp_UpdateShipmentStatus (AWBNumber, NewStatus )
CREATE OR ALTER PROCEDURE dbo.usp_UpdateShipmentStatus
	@AWBNumber NVARCHAR(20),
	@NewStatus NVARCHAR(30)

AS
BEGIN

IF @NewStatus NOT IN ('Booked','In Transit','Out for Delivery','Delivered','RTO')
BEGIN
    RAISERROR ('Invalid Status', 16, 1);
    RETURN;
END

UPDATE dbo.Shipments
SET Status = @NewStatus,
DeliveredAt = CASE
				  WHEN @NewStatus = 'Delivered' THEN GETDATE()
				  ELSE NULL
			  END
WHERE AWBNumber = @AWBNumber
END
GO

-- Views 

-- vw_ShipmentDashboard

CREATE OR ALTER VIEW dbo.vw_ShipmentDashboard
AS
	SELECT
	AWBNumber, SenderName, ReceiverName, Origin, Destination, Status, BookedAt
	FROM dbo.Shipments
GO

-- indexes

IF NOT EXISTS (
    SELECT 1  FROM sys.indexes 
	WHERE NAME = 'IX_Shipments_Status' AND object_id = OBJECT_ID('dbo.Shipments')
)
BEGIN
    CREATE NONCLUSTERED INDEX IX_Shipments_Status
    ON dbo.Shipments (Status)
    INCLUDE (AWBNumber, SenderName, ReceiverName, BookedAt);
END
GO

EXEC usp_GetAllShipments
