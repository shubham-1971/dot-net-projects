using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Student_Course_And_Fee_Management_System.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Student_Course_And_Fee_Management_System.Models;

    public class CourseService
    {
        public List<Course> courses = new List<Course>();

        public void AddCourse()
        {
            try
            {
                Console.Write("Course Id: ");
                int id = int.Parse(Console.ReadLine());

                if (courses.Any(c => c.CourseId == id))
                {
                    Console.WriteLine("Course ID must be unique!");
                    return;
                }

                Console.Write("Course Name: ");
                string name = Console.ReadLine();

                Console.Write("Fee: ");
                decimal fee = decimal.Parse(Console.ReadLine());

                courses.Add(new Course { CourseId = id, CourseName = name, Fee = fee });
                Console.WriteLine("Course Added!");
            }
            catch
            {
                Console.WriteLine("Invalid input!");
            }
        }

        public void ViewCourses()
        {
            foreach (var c in courses)
            {
                Console.WriteLine($"{c.CourseId} | {c.CourseName} | {c.Fee}");
            }
        }

        public Course GetCourseByName(string name)
        {
            return courses.FirstOrDefault(c => c.CourseName.Equals(name, StringComparison.OrdinalIgnoreCase));
        }

        public void DeleteCourse(List<Student> students)
        {
            Console.Write("Enter Course Name: ");
            string name = Console.ReadLine();

            if (students.Any(s => s.CourseName.Equals(name, StringComparison.OrdinalIgnoreCase)))
            {
                Console.WriteLine("Cannot delete. Students enrolled!");
                return;
            }

            var course = GetCourseByName(name);
            if (course != null)
            {
                courses.Remove(course);
                Console.WriteLine("Course Deleted!");
            }
        }
    }
}
