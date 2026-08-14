using Flight_Booking_Management_System.models;
using Microsoft.Data.SqlClient;
using System.Data;

namespace Flight_Booking_Management_System.Repository
{
    public class Flightrepositery : IFlight
    {
        public readonly string _connectionString;
        public Flightrepositery(IConfiguration connectionstring)
        {
            _connectionString = connectionstring.GetConnectionString("DefaultConnection");
        }

        public int AddFlight(Flight flight)
        {
            int res = 0;
            try
            {
                using (SqlConnection con = new SqlConnection(_connectionString))
                {
                    SqlCommand cmd = new SqlCommand("sp_InsertNewFlight", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@FlightNumber", flight.FlightNumber);
                    cmd.Parameters.AddWithValue("@SourceCity", flight.SourceCity);
                    cmd.Parameters.AddWithValue("@DestinationCity", flight.DestinationCity);
                    cmd.Parameters.AddWithValue("@DepartureTime", flight.DepartureTime);
                    cmd.Parameters.AddWithValue("@Price", flight.Price);
                    cmd.Parameters.AddWithValue("@AvailableSeats", flight.AvailableSeats);

                    con.Open();
                    res = cmd.ExecuteNonQuery();
                    
                }
            }
            catch (SqlException ex)
            {

                Console.WriteLine("Something Went Wring in DB: " + ex.Message);
            }
            catch (Exception ex)
            {

                Console.WriteLine("Exception caught: " + ex.Message);
            }
            return res;
           
        }

        public int DeleteFlight(int id)
        {
            int res = 0;
            try
            {
                using (SqlConnection con = new SqlConnection(_connectionString))
            {
                SqlCommand cmd = new SqlCommand("sp_DeleteFlight", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@FlightId", id);

                con.Open();
                return cmd.ExecuteNonQuery();
            }
            }
            catch (SqlException ex)
            {

                Console.WriteLine("Something Went Wring in DB: " + ex.Message);
            }
            catch (Exception ex)
            {

                Console.WriteLine("Exception caught: " + ex.Message);
            }

            return res;
        }

        public Flight GetById(int id)
        {
            Flight flight = null;
           
            try
            {
                using (SqlConnection con = new SqlConnection(_connectionString))
            {
                SqlCommand cmd = new SqlCommand("sp_GetFlightById", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@FlightId", id);

                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.Read())
                {
                    flight = new Flight()
                    {
                        FlightId = Convert.ToInt32(reader["FlightId"]),
                        FlightNumber = reader["FlightNumber"].ToString(),
                        SourceCity = reader["SourceCity"].ToString(),
                        DestinationCity = reader["DestinationCity"].ToString(),
                        DepartureTime = Convert.ToDateTime(reader["DepartureTime"]),
                        Price = Convert.ToDecimal(reader["Price"]),
                        AvailableSeats = Convert.ToInt32(reader["AvailableSeats"])
                    };
                }
            }

            }
            catch (SqlException ex)
            {

                Console.WriteLine("Something Went Wring in DB: " + ex.Message);
            }
            catch (Exception ex)
            {

                Console.WriteLine("Exception caught: " + ex.Message);
            }
            return flight;
        }

        //public List<Flight> GetFlight()
        //{
        //    List<Flight> flights = new List<Flight>();

        //    try
        //    {
        //        using (SqlConnection con = new SqlConnection(_connectionString))
        //        {
        //            SqlCommand cmd = new SqlCommand("sp_GetAllFlights", con);
        //            cmd.CommandType = CommandType.StoredProcedure;

        //            con.Open();
        //            SqlDataReader reader = cmd.ExecuteReader();

        //            while (reader.Read())
        //            {
        //                FlightId = Convert.ToInt32(reader["FlightId"]),
        //                FlightNumber = reader["FlightNumber"].ToString(),
        //                SourceCity = reader["SourceCity"].ToString(),
        //                DestinationCity = reader["DestinationCity"].ToString(),
        //                DepartureTime = Convert.ToDateTime(reader["DepartureTime"]),
        //                Price = Convert.ToDecimal(reader["Price"]),
        //                AvailableSeats = Convert.ToInt32(reader["AvailableSeats"])
        //            };
        //            //

        //            flights.Add(f);
        //        }
        //    }
        //    catch (SqlException ex)
        //    {

        //        Console.WriteLine("Something Went Wring in DB: " + ex.Message);
        //    }
        //    catch (Exception ex)
        //    {

        //        Console.WriteLine("Exception caught: " + ex.Message);
        //    }
        //    return flights;
        //}

        public List<Flight> GetFlight()
        {
            List<Flight> flights = new List<Flight>();

            try
            {
                using (SqlConnection con = new SqlConnection(_connectionString))
                {
                    SqlCommand cmd = new SqlCommand("sp_GetAllFlights", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        Flight f = new Flight
                        {
                            FlightId = Convert.ToInt32(reader["FlightId"]),
                            FlightNumber = reader["FlightNumber"].ToString(),
                            SourceCity = reader["SourceCity"].ToString(),
                            DestinationCity = reader["DestinationCity"].ToString(),
                            DepartureTime = Convert.ToDateTime(reader["DepartureTime"]),
                            Price = Convert.ToDecimal(reader["Price"]),
                            AvailableSeats = Convert.ToInt32(reader["AvailableSeats"])
                        };

                        flights.Add(f);
                    }
                }
            }
            catch (SqlException ex)
            {
                Console.WriteLine("Something Went Wrong in DB: " + ex.Message);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught: " + ex.Message);
            }

            return flights;
        }

        public int UpdateFlight(Flight flight)
        {
            int res = 0;
            try
            {
                using (SqlConnection con = new SqlConnection(_connectionString))
                {
                    SqlCommand cmd = new SqlCommand("sp_UpdateExistingFlight", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@FlightId", flight.FlightId);
                    cmd.Parameters.AddWithValue("@FlightNumber", flight.FlightNumber);
                    cmd.Parameters.AddWithValue("@SourceCity", flight.SourceCity);
                    cmd.Parameters.AddWithValue("@DestinationCity", flight.DestinationCity);
                    cmd.Parameters.AddWithValue("@DepartureTime", flight.DepartureTime);
                    cmd.Parameters.AddWithValue("@Price", flight.Price);
                    cmd.Parameters.AddWithValue("@AvailableSeats", flight.AvailableSeats);

                    con.Open();
                    res = cmd.ExecuteNonQuery();
                }
            }
            catch (SqlException ex)
            {

                Console.WriteLine("Something Went Wring in DB: " + ex.Message);
            }
            catch (Exception ex)
            {

                Console.WriteLine("Exception caught: " + ex.Message);
            }
            return res;
        }
    }

    }

