using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Banking_Management_System_Using_OOP.Models
{
    public class CurrentAccount : Account
    {
        public decimal OverdraftLimit { get; set; }

        public CurrentAccount(long accNo, decimal balance, decimal limit)
            : base(accNo, balance)
        {
            OverdraftLimit = limit;
        }

        public override void Withdraw(decimal amount)
        {
            if (amount <= Balance + OverdraftLimit)
            {
                Balance -= amount;
                Transactions.Add($"Withdrawn: {amount}");
            }
            else
            {
                Console.WriteLine("Overdraft limit exceeded");
            }
        }
    }
}
