using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Student_Course_And_Fee_Management_System.Models
{
    using System;

    public class Student
    {
        public int StudentId { get; set; }
        public string Name { get; set; }
        public string CourseName { get; set; }
        public decimal TotalFee { get; set; }
        public decimal FeePaid { get; set; }
        public DateTime AdmissionDate { get; set; }

        public decimal FeeDue => TotalFee - FeePaid;
    }
}
