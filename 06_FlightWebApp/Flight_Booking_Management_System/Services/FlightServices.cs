using Flight_Booking_Management_System.models;
using Flight_Booking_Management_System.Repository;

namespace Flight_Booking_Management_System.Services
{
    public class FlightServices:IFlightService
    {
        private readonly IFlight _repo;

        public FlightServices(IFlight repo)
        {
            _repo = repo;
        }

        public int AddFlight(Flight flight)
        {
            return _repo.AddFlight(flight);
        }

        public int DeleteFlight(int id)
        {
            return _repo.DeleteFlight(id);
        }

        public Flight GetById(int id)
        {
            return _repo.GetById(id);
        }

        public List<Flight> GetFlight()
        {
            return _repo.GetFlight();
        }

        public int UpdateFlight( Flight flight)
        {
            return _repo.UpdateFlight(flight);
        }
    }
}
