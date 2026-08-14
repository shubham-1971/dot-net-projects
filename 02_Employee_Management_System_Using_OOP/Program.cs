using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Employee_Management_System.Services;

namespace Employee_Management_System
{
    internal class Program
    {
        static void Main(string[] args)
        {

            // Login System

            AuthService authService = new AuthService();
            bool isAuthenticated = authService.Authenticate();
            if (isAuthenticated)
            {
                Console.WriteLine("Admin Authenticated");
            }
            else
            {
                Console.WriteLine("Account Locked");
            }
           
            // Menu driven

            if (isAuthenticated) {
                
                EmployeeService service = new EmployeeService();
                service.PerformService();
            }
        }
    }
}
