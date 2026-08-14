using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Employee_Management_System.Models
{
    public class FullTimeEmployee : Employee
    {
        int bonusPercentage = 20;
        double bonusAmount = 0.00;
        public static string  tpp;
       
        public FullTimeEmployee(int id, string name, double salary, string tpp) : base(id, name, salary) {
            FullTimeEmployee.tpp = tpp;
           
        }
        public override double CalculateBonus()
        {
            return (salary * bonusPercentage / 100);
        }
       
    }
}
