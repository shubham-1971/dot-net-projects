using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Super_Market_Billing_System.Services
{
    using System;

    public class ProductService
    {
        public Product[] products = new Product[100];
        public int productCount = 0;

        public void AddProduct()
        {
            if (productCount >= products.Length)
            {
                Console.WriteLine("Storage Full!");
                return;
            }

            Console.Write("Code: ");
            int code = int.Parse(Console.ReadLine());

            for (int i = 0; i < productCount; i++)
            {
                if (products[i].ProductCode == code)
                {
                    Console.WriteLine("Duplicate Code!");
                    return;
                }
            }

            Product p = new Product();
            p.ProductCode = code;

            Console.Write("Name: ");
            p.Name = Console.ReadLine();

            Console.Write("Price: ");
            p.Price = decimal.Parse(Console.ReadLine());

            Console.Write("Quantity: ");
            p.Quantity = int.Parse(Console.ReadLine());

            products[productCount++] = p;
            Console.WriteLine("Added!");
        }

        public void ViewProducts()
        {
            Console.WriteLine("Code\tName\tPrice\tQty");

            for (int i = 0; i < productCount; i++)
            {
                Console.WriteLine($"{products[i].ProductCode}\t{products[i].Name}\t{products[i].Price}\t{products[i].Quantity}");
            }
        }

        public Product FindByCode(int code)
        {
            for (int i = 0; i < productCount; i++)
            {
                if (products[i].ProductCode == code)
                    return products[i];
            }
            return null;
        }

        public void UpdateProduct()
        {
            Console.Write("Enter Code: ");
            int code = int.Parse(Console.ReadLine());

            Product p = FindByCode(code);
            if (p == null)
            {
                Console.WriteLine("Not Found!");
                return;
            }

            Console.Write("New Price: ");
            p.Price = decimal.Parse(Console.ReadLine());

            Console.Write("New Quantity: ");
            p.Quantity = int.Parse(Console.ReadLine());

            Console.WriteLine("Updated!");
        }

        public void DeleteProduct()
        {
            Console.Write("Enter Code: ");
            int code = int.Parse(Console.ReadLine());

            for (int i = 0; i < productCount; i++)
            {
                if (products[i].ProductCode == code)
                {
                    for (int j = i; j < productCount - 1; j++)
                    {
                        products[j] = products[j + 1];
                    }

                    productCount--;
                    Console.WriteLine("Deleted!");
                    return;
                }
            }

            Console.WriteLine("Not Found!");
        }

        public void SearchByName()
        {
            Console.Write("Enter Name: ");
            string name = Console.ReadLine().ToLower();

            for (int i = 0; i < productCount; i++)
            {
                if (products[i].Name.ToLower().Contains(name))
                {
                    Console.WriteLine($"{products[i].Name} - {products[i].Price}");
                }
            }
        }

        public void SearchByPrice()
        {
            Console.Write("Min: ");
            decimal min = decimal.Parse(Console.ReadLine());

            Console.Write("Max: ");
            decimal max = decimal.Parse(Console.ReadLine());

            for (int i = 0; i < productCount; i++)
            {
                if (products[i].Price >= min && products[i].Price <= max)
                {
                    Console.WriteLine($"{products[i].Name} - {products[i].Price}");
                }
            }
        }

        public void LowStock()
        {
            for (int i = 0; i < productCount; i++)
            {
                if (products[i].Quantity < 5)
                {
                    Console.WriteLine($"{products[i].Name} - Stock: {products[i].Quantity}");
                }
            }
        }
    }
}
