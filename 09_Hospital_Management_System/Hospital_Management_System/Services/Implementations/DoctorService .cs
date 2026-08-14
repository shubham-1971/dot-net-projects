namespace Hospital_Management_System.Services.Implementations
{
    using Hospital_Management_System.Data.Repositories.Interfaces;
    using Hospital_Management_System.Models;
    using Hospital_Management_System.Services.Interfaces;

    public class DoctorService : IDoctorService
    {
        private readonly IDoctorRepository _repo;

        public DoctorService(IDoctorRepository repo)
        {
            _repo = repo;
        }


        public void AddDoctor(Doctor doctor)
        {
            _repo.AddDoctor(doctor);
        }

        public void UpdateDoctorDetails(Doctor doctor)
        {
            _repo.UpdateDoctorDetails(doctor);
        }

        public void UpdateDoctorAvailability(int id, bool available)
        {
            _repo.UpdateDoctorAvailability(id, available);
        }

        public List<Doctor> GetDoctors(string? specialization, bool? available)
        {
            return _repo.GetDoctors(specialization, available);
        }
    }

}
