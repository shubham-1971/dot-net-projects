using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Super_Market_Billing_System.Menus;
using Super_Market_Billing_System.Services;

namespace Super_Market_Billing_System
{
    class Program
    {
        static void Main()
        {
            ProductService ps = new ProductService();
            CustomerService cs = new CustomerService();
            CartService cart = new CartService(ps);

            AdminMenu admin = new AdminMenu(ps);
            UserMenu user = new UserMenu(cs, cart);

            MainMenu main = new MainMenu(admin, user);
            main.Show();
        }
    }
}
