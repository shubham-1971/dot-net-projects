using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Super_Market_Billing_System.Services;

namespace Super_Market_Billing_System.Menus
{


    public class AdminMenu
    {
        private ProductService ps;

        public AdminMenu(ProductService service)
        {
            ps = service;
        }

        public void Show()
        {
            while (true)
            {
                Console.WriteLine();
                Console.WriteLine("ADMIN MENU");
                Console.WriteLine("1 Add Product");
                Console.WriteLine("2 View Products");
                Console.WriteLine("3 Update Product");
                Console.WriteLine("4 Delete Product");
                Console.WriteLine("5 Search by Name");
                Console.WriteLine("6 Search by Price");
                Console.WriteLine("7 Low Stock");
                Console.WriteLine("8 Back");

                int ch = int.Parse(Console.ReadLine());

                switch (ch)
                {
                    case 1: ps.AddProduct(); break;
                    case 2: ps.ViewProducts(); break;
                    case 3: ps.UpdateProduct(); break;
                    case 4: ps.DeleteProduct(); break;
                    case 5: ps.SearchByName(); break;
                    case 6: ps.SearchByPrice(); break;
                    case 7: ps.LowStock(); break;
                    case 8: return;
                }
            }
        }
    }
}
