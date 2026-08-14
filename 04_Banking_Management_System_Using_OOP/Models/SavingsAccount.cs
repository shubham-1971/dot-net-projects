using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Banking_Management_System_Using_OOP.Models
{
    public class SavingsAccount : Account
    {
        public decimal InterestRate { get; set; }
        private const decimal MinBalance = 500;

        public SavingsAccount(long accNo, decimal balance, decimal rate)
            : base(accNo, balance)
        {
            InterestRate = rate;
        }

        public override void Withdraw(decimal amount)
        {
            if (Balance - amount >= MinBalance)
                base.Withdraw(amount);
            else
                Console.WriteLine("Minimum balance must be maintained!");
        }

        public void AddInterest()
        {
            decimal interest = Balance * InterestRate / 100;
            Balance += interest;
            Transactions.Add($"Interest Added: {interest}");
        }
    }
}
