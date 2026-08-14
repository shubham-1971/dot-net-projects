create database BankDB

use BankDB
drop table Customers
drop table Transactions
drop table Admins

create table Customers(

AccountNumber BigInt identity(100,1) primary key,
FullName varchar(50) not null,
Gender Varchar(15),
MobileNumber varchar(15),
Email varchar(50) unique,
Address varchar(200),
 
AadhaarNumber varchar(12) unique,
AccountType varchar(15),
Password varchar(30),

Balance Decimal(10,2) default (0.00),

AccountStatus varchar(15) default 'Active',
CreatedDate Datetime default Getdate()
)

ALTER TABLE Transactions
ADD CONSTRAINT FK_Transactions_Customers
FOREIGN KEY (AccountNumber)
REFERENCES Customers(AccountNumber)
ON DELETE CASCADE;


create table Transactions(
TransactionId int identity(1000,1) primary key,
AccountNumber Bigint Foreign key(AccountNumber) references Customers,
TransactionType varchar(30),
Amount Decimal(10,2),
TransactionDate DateTime default GetDate(),
BalanceAfterTransaction Decimal(10,2)
)

create table Admins(
AdminId int identity(1,1) primary key,
UserName varchar(30) unique not null,
Password varchar(30) not null
)

INSERT INTO Customers
(FullName, Gender, MobileNumber, Email, Address, AadhaarNumber, AccountType, Password, Balance, AccountStatus)
VALUES
('Amit Sharma', 'Male', '9876543210', 'amit.sharma@gmail.com', 'Hyderabad, Telangana', '123456789001', 'Savings', 'Amit@123', 25000.50, 'Active'),

('Priya Verma', 'Female', '9876543211', 'priya.verma@gmail.com', 'Pune, Maharashtra', '123456789002', 'Savings', 'Priya@123', 18000.00, 'Active'),

('Rahul Mehta', 'Male', '9876543212', 'rahul.mehta@gmail.com', 'Ahmedabad, Gujarat', '123456789003', 'Current', 'Rahul@123', 75000.75, 'Active'),

('Sneha Iyer', 'Female', '9876543213', 'sneha.iyer@gmail.com', 'Chennai, Tamil Nadu', '123456789004', 'Savings', 'Sneha@123', 32000.25, 'Active'),

('Vikas Singh', 'Male', '9876543214', 'vikas.singh@gmail.com', 'Lucknow, Uttar Pradesh', '123456789005', 'Savings', 'Vikas@123', 15000.00, 'Inactive'),

('Anjali Patel', 'Female', '9876543215', 'anjali.patel@gmail.com', 'Surat, Gujarat', '123456789006', 'Current', 'Anjali@123', 92000.90, 'Active'),

('Rohit Kumar', 'Male', '9876543216', 'rohit.kumar@gmail.com', 'Patna, Bihar', '123456789007', 'Savings', 'Rohit@123', 12000.00, 'Active'),

('Neha Gupta', 'Female', '9876543217', 'neha.gupta@gmail.com', 'Delhi', '123456789008', 'Savings', 'Neha@123', 45000.75, 'Active'),

('Arjun Reddy', 'Male', '9876543218', 'arjun.reddy@gmail.com', 'Hyderabad, Telangana', '123456789009', 'Current', 'Arjun@123', 68000.00, 'Active'),

('Pooja Nair', 'Female', '9876543219', 'pooja.nair@gmail.com', 'Kochi, Kerala', '123456789010', 'Savings', 'Pooja@123', 29000.40, 'Inactive'),

('Suresh Rao', 'Male', '9876543220', 'suresh.rao@gmail.com', 'Bengaluru, Karnataka', '123456789011', 'Savings', 'Suresh@123', 51000.00, 'Active'),

('Kavita Joshi', 'Female', '9876543221', 'kavita.joshi@gmail.com', 'Jaipur, Rajasthan', '123456789012', 'Savings', 'Kavita@123', 26000.30, 'Active'),

('Manoj Yadav', 'Male', '9876543222', 'manoj.yadav@gmail.com', 'Gurugram, Haryana', '123456789013', 'Current', 'Manoj@123', 88000.80, 'Active'),

('Ritu Malhotra', 'Female', '9876543223', 'ritu.malhotra@gmail.com', 'Chandigarh', '123456789014', 'Savings', 'Ritu@123', 34000.00, 'Inactive'),

('Deepak Mishra', 'Male', '9876543224', 'deepak.mishra@gmail.com', 'Bhopal, Madhya Pradesh', '123456789015', 'Savings', 'Deepak@123', 21000.60, 'Active'),

('Nisha Agarwal', 'Female', '9876543225', 'nisha.agarwal@gmail.com', 'Kolkata, West Bengal', '123456789016', 'Current', 'Nisha@123', 99000.00, 'Active'),

('Karan Malhotra', 'Male', '9876543226', 'karan.malhotra@gmail.com', 'Amritsar, Punjab', '123456789017', 'Savings', 'Karan@123', 27000.00, 'Active'),

('Meena Das', 'Female', '9876543227', 'meena.das@gmail.com', 'Guwahati, Assam', '123456789018', 'Savings', 'Meena@123', 19000.50, 'Inactive'),

('Sanjay Kulkarni', 'Male', '9876543228', 'sanjay.kulkarni@gmail.com', 'Nagpur, Maharashtra', '123456789019', 'Current', 'Sanjay@123', 73000.10, 'Active'),

('Ayesha Khan', 'Female', '9876543229', 'ayesha.khan@gmail.com', 'Mumbai, Maharashtra', '123456789020', 'Savings', 'Ayesha@123', 55000.00, 'Active');

INSERT INTO Transactions
(AccountNumber, TransactionType, Amount, BalanceAfterTransaction)
VALUES
(100, 'Deposit', 5000.00, 30000.50),
(101, 'Withdraw', 2000.00, 16000.00),
(102, 'Deposit', 15000.00, 90000.75),
(103, 'Withdraw', 3000.00, 29000.25),
(104, 'Deposit', 7000.00, 22000.00),

(105, 'Deposit', 25000.00, 117000.90),
(106, 'Withdraw', 2000.00, 10000.00),
(107, 'Deposit', 8000.00, 53000.75),
(108, 'Withdraw', 10000.00, 58000.00),
(109, 'Deposit', 4000.00, 33000.40),

(110, 'Withdraw', 6000.00, 45000.00),
(111, 'Deposit', 9000.00, 35000.30),
(112, 'Withdraw', 12000.00, 76000.80),
(113, 'Deposit', 5000.00, 39000.00),
(114, 'Withdraw', 3500.00, 17500.60),

(115, 'Deposit', 20000.00, 119000.00),
(116, 'Withdraw', 4000.00, 23000.00),
(117, 'Deposit', 6000.00, 25000.50),
(118, 'Withdraw', 9000.00, 64000.10),
(119, 'Deposit', 10000.00, 65000.00);


INSERT INTO Admins (UserName, Password)
VALUES
('admin1', 'Admin@121'),
('admin2', 'Admin@122')

select * from Customers

select * from Transactions

select * from Admins

sp_help

create procedure sp_GetAdminCredentials @UserName varchar(30)
as
begin
	select UserName, Password from Admins where UserName = @UserName
end

exec sp_GetAdminCredentials admin1

create procedure sp_GetCustomerCredentials @AccountNumber bigint
as
begin
	select AccountNumber, Password from Customers where AccountNumber = @AccountNumber
end

exec sp_GetCustomerCredentials 101

drop procedure sp_GetCustomerCredentials

create procedure sp_register @FullName varchar(50), @Gender varchar(50), @MobileNumber varchar(15),@Email varchar(50),@Address varchar(200),@AadhaarNumber varchar(12),@AccountType varchar(15), @Password varchar(30)
as
begin
    insert into Customers( FullName, Gender, MobileNumber,Email,Address,AadhaarNumber,AccountType, Password)
	values (@FullName, @Gender, @MobileNumber, @Email, @Address, @AadhaarNumber, @AccountType, @Password)
end


create procedure sp_AddCustomer @FullName varchar(50), @Gender varchar(50), @MobileNumber varchar(15),@Email varchar(50),@Address varchar(200),@AadhaarNumber varchar(12),@AccountType varchar(15),@Balance decimal(10,2), @Password varchar(30)
as
begin 
	insert into Customers( FullName, Gender, MobileNumber,Email,Address,AadhaarNumber,AccountType,Balance, Password)
	values (@FullName, @Gender, @MobileNumber, @Email, @Address, @AadhaarNumber, @AccountType, @Balance, @Password)
end

exec sp_AddCustomer
'Rahul Sharma',
    'Male',
    '9876543210',
    'rahul.sharma@gmail.com',
    'Banjara Hills, Hyderabad',
    '1234-5678-9012',
    'Savings',
    15000.00,
    'rahul@123';

select * from transactions

create procedure sp_GetMaxId 
as
begin
    select max(AccountNumber) from Customers
end

exec sp_GetMaxId

create procedure sp_UpdateCustomerMobileNumber @AccountNumber BigInt, @MobileNumber varchar(15)
as
begin
    update Customers set MobileNumber = @MobileNumber
    where AccountNumber = @AccountNumber
end

exec sp_UpdateCustomerMobileNumber 100, 9876543311

create procedure sp_UpdateCustomerEmail @AccountNumber BigInt, @Email varchar(50)
as
begin
    update Customers set Email = @Email
    where AccountNumber = @AccountNumber
end

exec sp_UpdateCustomerEmail 100, 'abc@gmail.com'

create procedure sp_UpdateCustomerAddress @AccountNumber BigInt, @Address varchar(200)
as
begin
    update Customers set Address = @Address
    where AccountNumber = @AccountNumber
end

exec sp_UpdateCustomerAddress 100, 'Patna Boring road'

create procedure sp_UpdateCustomerAccountType @AccountNumber BigInt, @AccountType varchar(15)
as
begin
    update Customers set AccountType = @AccountType
    where AccountNumber = @AccountNumber
end

exec sp_UpdateCustomerAccountType 100, 'Current'

create procedure sp_UpdateCustomerAccountStatus @AccountNumber BigInt, @AccountStatus varchar(15)
as
begin
    update Customers set AccountStatus = @AccountStatus
    where AccountNumber = @AccountNumber
end

exec sp_UpdateCustomerAccountStatus 100, 'Inactive'

create procedure sp_DeleteCustomer @AccountNumber BigInt
as
begin
    delete from Customers
    where AccountNumber = @AccountNumber
end

exec sp_DeleteCustomer 100

create procedure sp_GetAllCustomers
as
begin
    select AccountNumber, FullName, AccountType, Balance, AccountStatus   from Customers
end

exec sp_GetAllCustomers

create procedure sp_GetCustomerByAccountNumber @AccountNumber BigInt
as
begin
    select AccountNumber, FullName, AccountType, Balance, AccountStatus
     from Customers where AccountNumber = @AccountNumber
end

exec sp_GetCustomerByAccountNumber 100

create procedure sp_GetCustomerByMobileNumber @MobileNumber varchar(15)
as
begin
    select AccountNumber, FullName, AccountType, Balance, AccountStatus
     from Customers where MobileNumber = @MobileNumber
end

exec sp_GetCustomerByMobileNumber '9876543211'

create procedure sp_GetCustomerByAccountType @AccountType varchar(15)
as
begin
    select AccountNumber, FullName, AccountType, Balance, AccountStatus
     from Customers where AccountType = @AccountType
end

exec sp_GetCustomerByAccountType 'Savings'

create procedure sp_GetAllTransactions
as
begin
    select TransactionId, AccountNumber, TransactionType, Amount, TransactionDate, BalanceAfterTransaction from Transactions
end

exec sp_GetAllTransactions


CREATE PROCEDURE sp_Deposit
    @AccountNumber BIGINT,
    @Amount DECIMAL(10,2)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @AccountStatus VARCHAR(15);

    -- 1. Get account status
    SELECT @AccountStatus = AccountStatus
    FROM Customers
    WHERE AccountNumber = @AccountNumber;

    -- 2. Account not found
    IF (@AccountStatus IS NULL)
    BEGIN
        THROW 50006, 'Invalid account number', 1;
    END

    -- 3. Inactive account (THIS WILL STOP DEPOSIT)
    IF (@AccountStatus = 'Inactive')
    BEGIN
        THROW 50005, 'Account is inactive. Deposit not allowed.', 1;
    END

    -- 4. Invalid amount
    IF (@Amount <= 0)
    BEGIN
        THROW 50001, 'Deposit amount must be greater than zero', 1;
    END

    -- 5. Safe transaction
    BEGIN TRANSACTION;

    UPDATE Customers
    SET Balance = Balance + @Amount
    WHERE AccountNumber = @AccountNumber
      AND AccountStatus = 'Active';

    COMMIT TRANSACTION;
END
drop procedure sp_FundTransfer

exec sp_Deposit 100, 500

CREATE PROCEDURE sp_Withdraw
    @AccountNumber BIGINT,
    @Amount DECIMAL(10,2)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @AccountStatus VARCHAR(15);
    DECLARE @Balance DECIMAL(10,2);

    SELECT 
        @AccountStatus = AccountStatus,
        @Balance = Balance
    FROM Customers
    WHERE AccountNumber = @AccountNumber;

    IF (@AccountStatus IS NULL)
        THROW 50006, 'Invalid account number', 1;

    IF (@AccountStatus = 'Inactive')
        THROW 50005, 'Account is inactive. Withdrawal not allowed.', 1;

    IF (@Amount <= 0)
        THROW 50001, 'Withdrawal amount must be greater than zero', 1;

    IF (@Balance < @Amount)
        THROW 50002, 'Insufficient balance', 1;

    BEGIN TRANSACTION;

    UPDATE Customers
    SET Balance = Balance - @Amount
    WHERE AccountNumber = @AccountNumber
      AND AccountStatus = 'Active';

    COMMIT TRANSACTION;
END

exec sp_Withdraw 100, 500

CREATE PROCEDURE sp_FundTransfer
    @FromAccountNumber BIGINT,
    @ToAccountNumber   BIGINT,
    @Amount            DECIMAL(10,2)
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY

        -- BASIC VALIDATION 

        IF (@Amount <= 0)
            THROW 50001, 'Amount must be greater than zero', 1;

        DECLARE 
            @SenderStatus   VARCHAR(15),
            @ReceiverStatus VARCHAR(15),
            @SenderBalance  DECIMAL(10,2);

        -- FETCH SENDER DATA 

        SELECT 
            @SenderStatus  = AccountStatus,
            @SenderBalance = Balance
        FROM Customers
        WHERE AccountNumber = @FromAccountNumber;

        IF (@SenderStatus IS NULL)
            THROW 50002, 'Sender account not found', 1;

        IF (@SenderStatus = 'Inactive')
            THROW 50004, 'Sender account is inactive. Fund transfer not allowed.', 1;

        IF (@SenderBalance < @Amount)
            THROW 50006, 'Insufficient funds', 1;

        -- FETCH RECEIVER DATA

        SELECT 
            @ReceiverStatus = AccountStatus
        FROM Customers
        WHERE AccountNumber = @ToAccountNumber;

        IF (@ReceiverStatus IS NULL)
            THROW 50003, 'Receiver account not found', 1;

        IF (@ReceiverStatus = 'Inactive')
            THROW 50005, 'Receiver account is inactive. Fund transfer not allowed.', 1;

        -- TRANSACTION

        BEGIN TRANSACTION;

        -- Debit sender (defensive check)
        UPDATE Customers
        SET Balance = Balance - @Amount
        WHERE AccountNumber = @FromAccountNumber
          AND AccountStatus = 'Active';

        -- Credit receiver (defensive check)
        UPDATE Customers
        SET Balance = Balance + @Amount
        WHERE AccountNumber = @ToAccountNumber
          AND AccountStatus = 'Active';

        -- LOG TRANSACTIONS

        DECLARE @SenderBalanceAfter DECIMAL(10,2);
        SELECT @SenderBalanceAfter = Balance
        FROM Customers
        WHERE AccountNumber = @FromAccountNumber;

        INSERT INTO Transactions
            (AccountNumber, TransactionType, Amount, BalanceAfterTransaction)
        VALUES
            (@FromAccountNumber, 'Transfer-Debit', @Amount, @SenderBalanceAfter);

        DECLARE @ReceiverBalanceAfter DECIMAL(10,2);
        SELECT @ReceiverBalanceAfter = Balance
        FROM Customers
        WHERE AccountNumber = @ToAccountNumber;

        INSERT INTO Transactions
            (AccountNumber, TransactionType, Amount, BalanceAfterTransaction)
        VALUES
            (@ToAccountNumber, 'Transfer-Credit', @Amount, @ReceiverBalanceAfter);

        COMMIT TRANSACTION;

    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        THROW;   -- rethrow original error
    END CATCH
END
exec sp_FundTransfer 101, 600, 102


create procedure sp_GetBalance @AccountNumber bigint
as
begin
    select Balance from Customers where AccountNumber = @AccountNumber
end

exec sp_GetBalance 104

create procedure sp_GetMiniStatement @AccountNumber bigint
as
begin
    select top 5 * from Transactions
    where AccountNumber = @AccountNumber
    order by TransactionId desc;
end

exec sp_GetMiniStatement 100

create procedure sp_UpdateCustomerPassword @AccountNumber bigint, @Password varchar(30)
as
begin
    update Customers set Password = @Password 
    where AccountNumber = @AccountNumber
end

exec sp_UpdateCustomerPassword 100, 'ab@bcd'

select * from Customers

select * from Admins