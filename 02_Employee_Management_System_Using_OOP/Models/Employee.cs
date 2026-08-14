using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Employee_Management_System.Models
{
    public class Employee
    {
        static string companyName = "Acuvate Software";
        public int id;
        public string name;
        public double salary;
        

        public Employee(int id, string name, double salary)
        {
            this.id = id;
            this.name = name;
            this.salary = salary;
           
        }

        public virtual double CalculateBonus()
        {
            return 0.00;
        }

        public void DisplayDetails()
        {
            Console.WriteLine($"Company Name:- {companyName}");
            Console.WriteLine($"Employee ID:- {id}");
            Console.WriteLine($"Employee Name:- {name}");
            Console.WriteLine($"Employee Salary:- {salary}");
        }
    }
}
