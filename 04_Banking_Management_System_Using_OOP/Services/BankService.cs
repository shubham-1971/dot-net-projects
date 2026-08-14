using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Banking_Management_System_Using_OOP.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Banking_Management_System_Using_OOP.Models;

    public class BankService
    {
        public List<Customer> customers = new List<Customer>();
        public List<Account> accounts = new List<Account>();
        public List<Loan> loans = new List<Loan>();

        // CUSTOMER 
        public void AddCustomer()
        {
            try
            {
                Console.Write("ID: ");
                int id = int.Parse(Console.ReadLine());
                foreach (Customer customer in customers) {
                    if (customer.CustomerId == id) {
                        Console.WriteLine("Customer ID already Exists.");
                        return;
                    }
                }

                Console.Write("Name: ");
                string name = Console.ReadLine();

                Console.Write("City: ");
                string city = Console.ReadLine();

                customers.Add(new Customer(id, name, city));
            }
            catch { Console.WriteLine("Invalid input"); }
        }

        public void ViewCustomers()
        {
            foreach (var c in customers)
                c.DisplayCustomer();

            Console.WriteLine($"Total Customers: {Customer.TotalCustomers}");
        }

        // ACCOUNT
        public void CreateAccount()
        {
            try
            {
                Console.WriteLine("1. Savings  2. Current");
                int type = int.Parse(Console.ReadLine());

                Console.Write("Account No: ");
                long accNo = long.Parse(Console.ReadLine());

                Console.Write("Initial Balance: ");
                decimal bal = decimal.Parse(Console.ReadLine());

                if (type == 1)
                {
                    accounts.Add(new SavingsAccount(accNo, bal, 5));
                }
                else
                {
                    accounts.Add(new CurrentAccount(accNo, bal, 1000));
                }
            }
            catch { Console.WriteLine("Error"); }
        }

        public Account GetAccount(long accNo)
        {
            return accounts.FirstOrDefault(a => a.AccountNumber == accNo);
        }

        public void Deposit()
        {
            Console.Write("Account No: ");
            long accNo = long.Parse(Console.ReadLine());

            Console.Write("Amount: ");
            decimal amt = decimal.Parse(Console.ReadLine());

            GetAccount(accNo)?.Deposit(amt);
        }

        public void Withdraw()
        {
            Console.Write("Account No: ");
            long accNo = long.Parse(Console.ReadLine());

            Console.Write("Amount: ");
            decimal amt = decimal.Parse(Console.ReadLine());

            GetAccount(accNo)?.Withdraw(amt);
        }

        public void Transfer()
        {
            Console.Write("From Acc: ");
            long from = long.Parse(Console.ReadLine());

            Console.Write("To Acc: ");
            long to = long.Parse(Console.ReadLine());

            Console.Write("Amount: ");
            decimal amt = decimal.Parse(Console.ReadLine());

            var acc1 = GetAccount(from);
            var acc2 = GetAccount(to);

            if (acc1 != null && acc2 != null)
            {
                acc1.Withdraw(amt);
                acc2.Deposit(amt);
            }
        }

        public void CheckBalance()
        {
            Console.Write("Account No: ");
            long accNo = long.Parse(Console.ReadLine());
            GetAccount(accNo)?.ShowBalance();
        }

        // LOAN 
        public void ApplyLoan()
        {
            Console.Write("Loan ID: ");
            int id = int.Parse(Console.ReadLine());

            Console.Write("Customer ID: ");
            int cid = int.Parse(Console.ReadLine());

            Console.Write("Amount: ");
            decimal amt = decimal.Parse(Console.ReadLine());

            loans.Add(new Loan(id, cid, amt, 10));
        }

        public void ViewLoans()
        {
            foreach (var l in loans)
            {
                Console.WriteLine($"{l.LoanId} | Cust:{l.CustomerId} | Amt:{l.LoanAmount} | Interest:{l.CalculateInterest()}");
            }
        }
    }
}
