namespace Hospital_Management_System.DTOs
{
    using System.ComponentModel.DataAnnotations;

    public class CreateDoctorDto
    {
        [Required]
        public string FullName { get; set; }

        [Required]
        public string Specialization { get; set; }

        [Required]
        public string Mob { get; set; }

        [Required]
        public int Fee { get; set; }

        public bool Available { get; set; } = true;
    }
}