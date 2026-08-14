using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Banking_Management_System_Using_OOP.Services;

namespace Banking_Management_System_Using_OOP
{
    class Program
    {
        static void Main()
        {
            BankService bank = new BankService();

            while (true)
            {
                Console.WriteLine();
                Console.WriteLine("===== Banking System =====");
                Console.WriteLine("1. Add Customer");
                Console.WriteLine("2. View Customers");
                Console.WriteLine("3. Create Account");
                Console.WriteLine("4. Deposit");
                Console.WriteLine("5. Withdraw");
                Console.WriteLine("6. Check Balance");
                Console.WriteLine("7. Transfer");
                Console.WriteLine("8. Apply Loan");
                Console.WriteLine("9. View Loans");
                Console.WriteLine("10. Exit");

                int ch = int.Parse(Console.ReadLine());

                switch (ch)
                {
                    case 1: bank.AddCustomer(); break;
                    case 2: bank.ViewCustomers(); break;
                    case 3: bank.CreateAccount(); break;
                    case 4: bank.Deposit(); break;
                    case 5: bank.Withdraw(); break;
                    case 6: bank.CheckBalance(); break;
                    case 7: bank.Transfer(); break;
                    case 8: bank.ApplyLoan(); break;
                    case 9: bank.ViewLoans(); break;
                    case 10: return;
                }
            }
        }
    }
}
