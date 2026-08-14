namespace Hospital_Management_System.DTOs
{
    using System.ComponentModel.DataAnnotations;

    public class UpdateDoctorAvailabilityDto
    {
        [Required]
        public bool Available { get; set; }
    }
}