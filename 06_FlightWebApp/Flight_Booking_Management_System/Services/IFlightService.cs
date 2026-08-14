using Flight_Booking_Management_System.models;

namespace Flight_Booking_Management_System.Services
{
    public interface IFlightService
    {
        int UpdateFlight( Flight flight);
        int DeleteFlight(int id);
        int AddFlight(Flight flight);
        List<Flight> GetFlight();

        Flight GetById(int id);
    }
}
