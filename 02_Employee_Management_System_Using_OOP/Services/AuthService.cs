using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Employee_Management_System.Services
{
    internal class AuthService
    {
        string userName;
        string password;
        bool authResult = false;
        int maxAttempt = 3;

        public bool Authenticate()
        {
            while (maxAttempt > 0)
            {
                Console.WriteLine("-----WELCOME TO EMPLOYEE MANAGEMENT SYSTEM-----\n");
                Console.WriteLine("Enter Admin UserName");
                userName = Console.ReadLine();
                Console.WriteLine("Enter Admin Password");
                password = Console.ReadLine();
                if (string.IsNullOrWhiteSpace(userName) || string.IsNullOrWhiteSpace(password))
                {
                    Console.WriteLine("Username or Password is empty");
                    maxAttempt--;
                    Console.WriteLine($"{maxAttempt} Attempts left!");
                    continue;
                }
                else if (userName == "admin" && password == "1234")
                {
                    Console.WriteLine("User Authenticated");
                    authResult = true;
                    break;
                }
                else
                {
                    Console.WriteLine("Invalid user");
                    maxAttempt--;
                    Console.WriteLine($"{maxAttempt} Attempts left!");
                    continue;
                }
            }
                return authResult;
            }
    }
}

