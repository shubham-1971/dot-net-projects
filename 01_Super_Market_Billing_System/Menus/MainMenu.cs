using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Super_Market_Billing_System.Menus
{
  

    public class MainMenu
    {
        private AdminMenu admin;
        private UserMenu user;

        public MainMenu(AdminMenu a, UserMenu u)
        {
            admin = a;
            user = u;
        }

        public void Show()
        {
            while (true)
            {
                Console.WriteLine();
                Console.WriteLine("MAIN MENU");
                Console.WriteLine("1 Admin");
                Console.WriteLine("2 User");
                Console.WriteLine("3 Exit");

                int ch = int.Parse(Console.ReadLine());

                switch (ch)
                {
                    case 1: admin.Show(); break;
                    case 2: user.Show(); break;
                    case 3: return;
                }
            }
        }
    }
}
