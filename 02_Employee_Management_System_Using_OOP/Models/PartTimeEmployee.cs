using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Employee_Management_System.Models
{
    public class PartTimeEmployee : Employee
    {
        int bonusPercentage = 5;
        double bonusAmount = 0.00;
        public static string  tpp;


        public PartTimeEmployee(int id, string name, double salary,string tpp) : base(id, name, salary) {
            PartTimeEmployee.tpp = tpp;

        }
        public override double CalculateBonus()
        { 
            return (salary*bonusPercentage)/100;
            
        }
        

    }
}
