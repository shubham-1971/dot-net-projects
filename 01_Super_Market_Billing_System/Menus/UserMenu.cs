using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Super_Market_Billing_System.Services;

namespace Super_Market_Billing_System.Menus
{
    public class UserMenu
    {
        private CustomerService cs;
        private CartService cart;

        public UserMenu(CustomerService c, CartService ct)
        {
            cs = c;
            cart = ct;
        }

        public void Show()
        {
            while (true)
            {
                Console.WriteLine();
                Console.WriteLine("USER MENU");
                Console.WriteLine("1 Add Customer");
                Console.WriteLine("2 View Customers");
                Console.WriteLine("3 Update Customer");
                Console.WriteLine("4 Delete Customer");
                Console.WriteLine("5 Add to Cart");
                Console.WriteLine("6 Remove from Cart");
                Console.WriteLine("7 View Cart");
                Console.WriteLine("8 Generate Bill");
                Console.WriteLine("9 Back");

                int ch = int.Parse(Console.ReadLine());

                switch (ch)
                {
                    case 1: cs.AddCustomer(); break;
                    case 2: cs.ViewCustomers(); break;
                    case 3: cs.UpdateCustomer(); break;
                    case 4: cs.DeleteCustomer(); break;
                    case 5: cart.AddToCart(); break;
                    case 6: cart.RemoveFromCart(); break;
                    case 7: cart.ViewCart(); break;
                    case 8: cart.GenerateBill(); break;
                    case 9: return;
                }
            }
        }
    }
}
