using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Super_Market_Billing_System.Services
{
  

    public class CustomerService
    {
        public Customer[] customers = new Customer[50];
        public int customerCount = 0;

        public void AddCustomer()
        {
            if (customerCount >= customers.Length)
            {
                Console.WriteLine("Full!");
                return;
            }

            Customer c = new Customer();

            Console.Write("ID: ");
            c.CustomerId = int.Parse(Console.ReadLine());

            Console.Write("Name: ");
            c.Name = Console.ReadLine();

            customers[customerCount++] = c;
        }

        public void ViewCustomers()
        {
            for (int i = 0; i < customerCount; i++)
            {
                Console.WriteLine($"{customers[i].CustomerId} - {customers[i].Name}");
            }
        }

        public void UpdateCustomer()
        {
            Console.Write("Enter ID: ");
            int id = int.Parse(Console.ReadLine());

            for (int i = 0; i < customerCount; i++)
            {
                if (customers[i].CustomerId == id)
                {
                    Console.Write("New Name: ");
                    customers[i].Name = Console.ReadLine();
                    Console.WriteLine("Updated!");
                    return;
                }
            }

            Console.WriteLine("Not Found!");
        }

        public void DeleteCustomer()
        {
            Console.Write("Enter ID: ");
            int id = int.Parse(Console.ReadLine());

            for (int i = 0; i < customerCount; i++)
            {
                if (customers[i].CustomerId == id)
                {
                    for (int j = i; j < customerCount - 1; j++)
                    {
                        customers[j] = customers[j + 1];
                    }

                    customerCount--;
                    Console.WriteLine("Deleted!");
                    return;
                }
            }

            Console.WriteLine("Not Found!");
        }
    }
}
