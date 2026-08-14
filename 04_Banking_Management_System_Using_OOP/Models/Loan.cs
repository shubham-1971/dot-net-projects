using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Banking_Management_System_Using_OOP.Models
{
    using System;

    public class Loan
    {
        public int LoanId { get; set; }
        public int CustomerId { get; set; }
        public decimal LoanAmount { get; set; }
        public double InterestRate { get; set; }

        public Loan(int id, int custId, decimal amt, double rate)
        {
            LoanId = id;
            CustomerId = custId;
            LoanAmount = amt;
            InterestRate = rate;
        }

        public double CalculateInterest()
        {
            return (double)LoanAmount * InterestRate / 100;
        }
    }
}
