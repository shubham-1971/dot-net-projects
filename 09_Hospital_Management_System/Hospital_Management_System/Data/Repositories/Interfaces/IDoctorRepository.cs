namespace Hospital_Management_System.Data.Repositories.Interfaces
{

    using Hospital_Management_System.Models;

    public interface IDoctorRepository
    {

        void AddDoctor(Doctor doctor);

        void UpdateDoctorDetails(Doctor doctor);

        void UpdateDoctorAvailability(int id, bool available);

        List<Doctor> GetDoctors(string? specialization, bool? available);
    }

}
