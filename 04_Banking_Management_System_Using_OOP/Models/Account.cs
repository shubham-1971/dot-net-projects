using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Banking_Management_System_Using_OOP.Models
{
    using System;
    using System.Collections.Generic;
    using Banking_Management_System_Using_OOP.Interfaces;

    public class Account : IAccount
    {
        public long AccountNumber { get; set; }
        public decimal Balance { get; set; }

        public List<string> Transactions = new List<string>();

        public Account(long accNo, decimal balance)
        {
            AccountNumber = accNo;
            Balance = balance;
        }

        public virtual void Deposit(decimal amount)
        {
            Balance += amount;
            Transactions.Add($"Deposited: {amount}");
        }

        public virtual void Withdraw(decimal amount)
        {
            if (amount <= Balance)
            {
                Balance -= amount;
                Transactions.Add($"Withdrawn: {amount}");
            }
            else
            {
                Console.WriteLine("Insufficient balance");
            }
        }

        public void ShowBalance()
        {
            Console.WriteLine($"Balance: {Balance}");
        }

        public void ShowTransactions()
        {
            foreach (var t in Transactions)
                Console.WriteLine(t);
        }
    }
}
