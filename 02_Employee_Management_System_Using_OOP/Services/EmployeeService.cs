using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using Employee_Management_System.Models;

namespace Employee_Management_System.Services
{
    internal class EmployeeService
    {
        List<Employee> list = new List<Employee>();
        public EmployeeService()
        {

        }

        public void PerformService()
        {   bool exit = true;
            while (exit) {
                Console.WriteLine("\nEnter Choices");
                Console.WriteLine("1. Add");
                Console.WriteLine("2. View Employees");
                Console.WriteLine("3. Sort Employees");
                Console.WriteLine("4. Nth Highet Salary");
                Console.WriteLine("5. Duplicate Employees");
                Console.WriteLine("6. Reverse Name");
                Console.WriteLine("7. Calculate Bonus");
                Console.WriteLine("8. Exit");
                int choice = Convert.ToInt32(Console.ReadLine());
                switch (choice)
                {
                    case 1:
                        Console.WriteLine("Add Employee");
                        AddEmployee();
                        ViewEmployee(list);
                        break;

                    case 2:
                        Console.WriteLine("view Employee");
                        ViewEmployee(list);
                        break;

                    case 3:
                        Console.WriteLine("Sort Employee");
                        SortEmployee();

                        break;

                    case 4:
                        Console.WriteLine("Find Nth Highest Employee");
                        NthHighestSalary();
                        break;

                    case 5:
                        Console.WriteLine("Find Duplicate Name");
                        findDuplicateNames();
                        break;

                    case 6:
                        Console.WriteLine("Reverse Employee Names");
                        ReverseEmployeeName();
                        break;

                    case 7:
                        Console.WriteLine("Calculate Bonus");
                        CalculateBonus();
                        break;



                    case 8:
                        Console.WriteLine("Exit");
                        exit = true;
                        return;

                    default:
                        Console.WriteLine("Invalid choice");
                        break;

                }
                
            }
        }

        // 1. Add Employee

        public void AddEmployee()
        {
            Console.WriteLine("Enter Employee id: ");
            int id = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine("Enter Employee Name: ");
            string name = Console.ReadLine();
            Console.WriteLine("Enter Employee salary: ");
            double salary = Convert.ToDouble(Console.ReadLine());
            Console.WriteLine("Enter 1 for Full Time Employee.");
            Console.WriteLine("Enter 2 for Part Time Employee.");
            int choice_add = Convert.ToInt32(Console.ReadLine());
            switch(choice_add)
            {

                case 1:
                    string tpp = "Full-time";
                    FullTimeEmployee F_emp = new FullTimeEmployee(id, name, salary,tpp);
                    list.Add(F_emp);
                    break;
                case 2:
                    string parttype = "Part-time";
                    PartTimeEmployee emp = new PartTimeEmployee(id, name, salary, parttype);
                    list.Add(emp);
                    break;
                default: Console.WriteLine("Invalid choice");
                    break;

            }

        }

        // 2 View Employee
        public void ViewEmployee(List<Employee> viewList)
        {
            Console.WriteLine("List of all Employees");
            Console.WriteLine("Id | Name | Salary | Type ");
            foreach(Employee emp in viewList)
            {
                string type = emp is FullTimeEmployee ? "Full-Time" : "Part-Time";
                Console.WriteLine(emp.id + " | " + emp.name + " | " + emp.salary + " | " + type);
            }
        }

        // 3 Sort Employee

        public void SortEmployee()
        {
            Console.WriteLine("Enter 1 if you want to sort employees on the basis of name");
            Console.WriteLine("Enter 2 if you want to sort employees on the basis of salary");
            int choice = Convert.ToInt32(Console.ReadLine());
            if (choice == 1)
            {
                Console.WriteLine("Press 1 to use Bubble sort");
                Console.WriteLine("Press 1 to use Bubble sort");
                Console.WriteLine("Press 2 to use Selection sort");
                Console.WriteLine("Press 3 to use Quick sort");
                int val = Convert.ToInt32(Console.ReadLine());

                switch(val)
                {
                    case 1: List<Employee> bubbleSorted = SortingService.BubbleSortEmp(list, (a, b) => string.Compare(a.name, b.name) > 0);
                        ViewEmployee(bubbleSorted);
                        break;
                    case 2: List<Employee> selectionSorted = SortingService.SelectionSortEmp(list, (a, b) => string.Compare(a.name, b.name) > 0);
                        ViewEmployee(selectionSorted);
                        break;
                    case 3: List<Employee> quickSorted = SortingService.QuickSortEmp(list, (a, b) => string.Compare(a.name, b.name) > 0);
                        ViewEmployee(quickSorted);
                        break;

                }

            }
            else if (choice == 2) {
                Console.WriteLine("Press 1 to use Bubble sort");
                Console.WriteLine("Press 2 to use Selection sort");
                Console.WriteLine("Press 3 to use Quick sort");
                int val = Convert.ToInt32(Console.ReadLine());

                switch (val)
                {
                    case 1:
                        List<Employee> bubbleSorted = SortingService.BubbleSortEmp(list, (a, b) => a.salary > b.salary);
                        ViewEmployee(bubbleSorted);
                        break;
                    case 2:
                        List<Employee> selectionSorted = SortingService.SelectionSortEmp(list, (a, b) => a.salary > b.salary);
                        ViewEmployee(selectionSorted);
                        break;
                    case 3:
                        List<Employee> quickSorted = SortingService.QuickSortEmp(list, (a, b) => a.salary > b.salary);
                        ViewEmployee(quickSorted);
                        break;
                }

            }
        }

        // 4 Nth highest salary
        public void NthHighestSalary()
        {
            Console.WriteLine("Enter the n value to get nth highest salary");
            int n = Convert.ToInt32(Console.ReadLine());
            List<Employee> sorted = SortingService.BubbleSortEmp(list, (a, b) => a.salary > b.salary);
            sorted.Reverse();
            if(n<= sorted.Count)
            {
                Employee emp = sorted[n-1];
                List<Employee> highest = new List<Employee>();
                highest.Add(emp);
                ViewEmployee(highest);
            }
        }

        // 5 Duplicate Names

        public void findDuplicateNames()
        {
            Console.WriteLine("List of all Employees");
            Console.WriteLine("Id | Name | Salary | Type ");
            for (int i = 0; i < list.Count; i++)
            {
                bool isDuplicate = false;
                // check if duplicate exists
                for (int j = 0; j < list.Count; j++)
                {
                    if (i != j && list[i].name == list[j].name)
                    {
                        isDuplicate = true;
                        break;
                    }
                }
                // check if already printed
                bool alreadyPrinted = false;
                for (int k = 0; k < i; k++)
                {
                    if (list[k].name == list[i].name)
                    {
                        alreadyPrinted = true;
                        break;

                    }
                }
                if (isDuplicate && !alreadyPrinted)
                {
                    Console.WriteLine(list[i].id + " | " + list[i].name + " | " + list[i].salary + " | " + FullTimeEmployee.tpp);
                }
            }
        }

        // 6 Reverse Employee Name
        public void ReverseEmployeeName()
        {
            List<Employee> reversed = new List<Employee>(list);
            foreach (Employee emp in reversed) { 
                 string name = emp.name;
                string[] parts = name.Split(' ');
                int start = 0;
                int end = parts.Length-1;
                while(start < end)
                {
                    string temp = parts[start];
                    parts[start] = parts[end];
                    parts[end] = temp;
                    start++;
                    end--;
                }
                string rev = string.Join(" ", parts);
                emp.name = rev;
            }
            ViewEmployee(reversed);
        }

        // 7 Calculate bonus
        public void CalculateBonus()
        {
                
            foreach(Employee emp in list)
            {
                string name = emp.name;
                double bonus = emp.CalculateBonus();
                Console.WriteLine($"Name: {name} , Bonus {bonus}" );
            }
        }
        }
}
