using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Student_Course_And_Fee_Management_System.Menus
{
    using System;
    using Student_Course_And_Fee_Management_System.Services;

    public class MainMenu
    {
        private CourseService courseService;
        private StudentService studentService;

        public MainMenu(CourseService cs, StudentService ss)
        {
            courseService = cs;
            studentService = ss;
        }

        public void Show()
        {
            while (true)
            {
                Console.WriteLine();
                Console.WriteLine("===== Student Course Management =====");
                Console.WriteLine("1. Add Course");
                Console.WriteLine("2. Add Student");
                Console.WriteLine("3. View All Students");
                Console.WriteLine("4. View All Courses");
                Console.WriteLine("5. Update Student");
                Console.WriteLine("6. Delete Student");
                Console.WriteLine("7. Search Student by Name");
                Console.WriteLine("8. Search by Course");
                Console.WriteLine("9. Search Students with Fee Due");
                Console.WriteLine("10. Search by Admission Month");
                Console.WriteLine("11. Reports");
                Console.WriteLine("12. Exit");

                int ch = int.Parse(Console.ReadLine());

                switch (ch)
                {
                    case 1: courseService.AddCourse(); break;
                    case 2: studentService.AddStudent(); break;
                    case 3: studentService.ViewStudents(); break;
                    case 4: courseService.ViewCourses(); break;
                    case 5: studentService.UpdateStudent(); break;
                    case 6: studentService.DeleteStudent(); break;
                    case 7: studentService.SearchByName(); break;
                    case 8: studentService.SearchByCourse(); break;
                    case 9: studentService.FeeDueStudents(); break;
                    case 10: studentService.SearchByMonth(); break;
                    case 11:
                        studentService.CourseWiseCount();
                        studentService.MonthlyRevenue();
                        break;
                    case 12: return;
                }
            }
        }
    }
}
