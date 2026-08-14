using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Student_Course_And_Fee_Management_System.Menus;
using Student_Course_And_Fee_Management_System.Services;

namespace Student_Course_And_Fee_Management_System
{
    class Program
    {
        static void Main()
        {
            CourseService cs = new CourseService();
            StudentService ss = new StudentService(cs);

            MainMenu menu = new MainMenu(cs, ss);
            menu.Show();
        }
    }
}
