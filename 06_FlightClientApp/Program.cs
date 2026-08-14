using System;
using System.Collections.Generic;
using FlightHttpClientApp.Services;
using System.Threading.Tasks;

using FlightHttpClientApp.Models;

namespace FlightHttpClientApp
{
    public class Program
    {

        static async Task Main(string[] args)

        {


            FlightService service = new FlightService();


            while (true)

            {

                Console.WriteLine("\n1. View Flights");
                Console.WriteLine("2. View Flight By FlightID");

                Console.WriteLine("3. Add Flight");

                Console.WriteLine("4. Update Flight");

                Console.WriteLine("5. Delete Flight");

                Console.WriteLine("6. Exit");


                Console.Write("Enter Choice: ");


                int choice = Convert.ToInt32(Console.ReadLine());


                switch (choice)

                {

                    case 1:


                        List<Flight> flights =

                            await service.GetFlights();


                        foreach (var f in flights)

                        {

                            Console.WriteLine(

                                $"{f.FlightId} - {f.FlightNumber}");

                        }


                        break;
                    case 2:
                        Console.WriteLine("Enter Flight ID to fetch details: ");
                        int id = Convert.ToInt32(Console.ReadLine());
                        Flight flightFetched =

                            await service.GetFlightById(id);


                        
                            Console.WriteLine(

                                $"{flightFetched.FlightId} - {flightFetched.FlightNumber}");

                        
                        break;


                    case 3:


                        Flight flight = new Flight();


                        Console.Write("Flight Number: ");

                        flight.FlightNumber = Console.ReadLine();


                        Console.Write("Source: ");

                        flight.SourceCity = Console.ReadLine();


                        Console.Write("Destination: ");

                        flight.DestinationCity = Console.ReadLine();


                        Console.Write("Departure Time: ");

                        flight.DepartureTime =

                            Convert.ToDateTime(Console.ReadLine());


                        Console.Write("Price: ");

                        flight.Price =

                            Convert.ToDecimal(Console.ReadLine());


                        Console.Write("Seats: ");

                        flight.AvailableSeats =

                            Convert.ToInt32(Console.ReadLine());


                        await service.AddFlight(flight);


                        Console.WriteLine("Flight Added");


                        break;


                    case 4:


                        Flight updateFlight = new Flight();


                        Console.Write("Enter Flight Id: ");

                        updateFlight.FlightId =

                            Convert.ToInt32(Console.ReadLine());


                        Console.Write("Flight Number: ");

                        updateFlight.FlightNumber =

                            Console.ReadLine();


                        Console.Write("Source City: ");

                        updateFlight.SourceCity =

                            Console.ReadLine();


                        Console.Write("Destination City: ");

                        updateFlight.DestinationCity =

                            Console.ReadLine();


                        Console.Write("Departure Time: ");

                        updateFlight.DepartureTime =

                            Convert.ToDateTime(Console.ReadLine());


                        Console.Write("Price: ");

                        updateFlight.Price =

                            Convert.ToDecimal(Console.ReadLine());


                        Console.Write("Available Seats: ");

                        updateFlight.AvailableSeats =

                            Convert.ToInt32(Console.ReadLine());


                        await service.UpdateFlight(updateFlight);


                        //Console.WriteLine("Flight Updated Successfully");


                        break;


                    case 5:


                        Console.Write("Enter Flight Id to Delete: ");


                        int deleteId =

                            Convert.ToInt32(Console.ReadLine());


                        await service.DeleteFlight(deleteId);


                        Console.WriteLine("Flight Deleted Successfully");


                        break;


                    case 6:

                        return;

                }

            }


        }

    }
}
