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

    public class StudentService
    {
        public List<Student> students = new List<Student>();
        private CourseService courseService;

        public StudentService(CourseService cs)
        {
            courseService = cs;
        }

        public void AddStudent()
        {
            try
            {
                Console.Write("Student ID: ");
                int id = int.Parse(Console.ReadLine());

                if (students.Any(s => s.StudentId == id))
                {
                    Console.WriteLine("ID must be unique!");
                    return;
                }

                Console.Write("Name: ");
                string name = Console.ReadLine();

                Console.Write("Course Name: ");
                string courseName = Console.ReadLine();

                var course = courseService.GetCourseByName(courseName);
                if (course == null)
                {
                    Console.WriteLine("Course does not exist!");
                    return;
                }

                Console.Write("Fee Paid: ");
                decimal paid = decimal.Parse(Console.ReadLine());

                if (paid > course.Fee)
                {
                    Console.WriteLine("FeePaid cannot exceed Total Fee!");
                    return;
                }

                students.Add(new Student
                {
                    StudentId = id,
                    Name = name,
                    CourseName = course.CourseName,
                    TotalFee = course.Fee,
                    FeePaid = paid,
                    AdmissionDate = DateTime.Now
                });

                Console.WriteLine("Student Added!");
            }
            catch
            {
                Console.WriteLine("Invalid input!");
            }
        }

        public void ViewStudents()
        {
            foreach (var s in students)
            {
                Console.WriteLine($"{s.StudentId} | {s.Name} | {s.CourseName} | Paid: {s.FeePaid} | Due: {s.FeeDue} | Date: {s.AdmissionDate.ToShortDateString()}");
            }
        }

        public void UpdateStudent()
        {
            Console.Write("Enter ID: ");
            int id = int.Parse(Console.ReadLine());

            var student = students.FirstOrDefault(s => s.StudentId == id);
            if (student == null) return;

            Console.Write("New Name: ");
            student.Name = Console.ReadLine();

            Console.Write("Additional Fee Paid: ");
            decimal add = decimal.Parse(Console.ReadLine());

            if (student.FeePaid + add > student.TotalFee)
            {
                Console.WriteLine("Exceeds total fee!");
                return;
            }

            student.FeePaid += add;
        }

        public void DeleteStudent()
        {
            Console.Write("Enter ID: ");
            int id = int.Parse(Console.ReadLine());

            var student = students.FirstOrDefault(s => s.StudentId == id);
            if (student != null)
            {
                students.Remove(student);
                Console.WriteLine("Deleted!");
            }
        }

        // -------- SEARCH --------

        public void SearchByName()
        {
            Console.Write("Enter name: ");
            string name = Console.ReadLine();

            // var result = students.Where(s => s.Name.Contains(name, StringComparison.OrdinalIgnoreCase));
            var result = students
     .Where(s => s.Name.IndexOf(name, StringComparison.OrdinalIgnoreCase) >= 0);
            foreach (var s in result)
                Console.WriteLine($"{s.Name} - {s.CourseName}");
        }

        public void SearchByCourse()
        {
            Console.Write("Enter course: ");
            string course = Console.ReadLine();

            var result = students.Where(s => s.CourseName.Equals(course, StringComparison.OrdinalIgnoreCase));
            foreach (var s in result)
                Console.WriteLine($"{s.Name}");
        }

        public void FeeDueStudents()
        {
            var result = students.Where(s => s.FeeDue > 0);
            foreach (var s in result)
                Console.WriteLine($"{s.Name} Due: {s.FeeDue}");
        }

        public void SearchByMonth()
        {
            Console.Write("Enter month (1-12): ");
            int m = int.Parse(Console.ReadLine());

            var result = students.Where(s => s.AdmissionDate.Month == m);
            foreach (var s in result)
                Console.WriteLine($"{s.Name} - {s.AdmissionDate}");
        }

        // -------- REPORTS --------

        public void CourseWiseCount()
        {
            var result = students.GroupBy(s => s.CourseName)
                                 .Select(g => new { Course = g.Key, Count = g.Count() });

            foreach (var r in result)
                Console.WriteLine($"{r.Course} : {r.Count}");
        }

        public void MonthlyRevenue()
        {
            var result = students.GroupBy(s => s.AdmissionDate.Month)
                                 .Select(g => new { Month = g.Key, Revenue = g.Sum(s => s.FeePaid) });

            foreach (var r in result)
                Console.WriteLine($"Month {r.Month} : {r.Revenue}");
        }
    }
}
