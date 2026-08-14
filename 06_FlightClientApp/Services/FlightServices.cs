using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using FlightHttpClientApp.Models;
using MySqlX.XDevAPI;
using Newtonsoft.Json;


namespace FlightHttpClientApp.Services
{
    public class FlightService
    {
        private readonly HttpClient _client;


        public FlightService()

        {

            _client = new HttpClient();


            _client.BaseAddress =

                new Uri("http://localhost:5269/api/Flight/");

        }


            // VIEW
        public async Task<List<Flight>> GetFlights()

            {

                HttpResponseMessage response =

                    await _client.GetAsync("");


                if (response.IsSuccessStatusCode)

                {

                    string data =

                        await response.Content.ReadAsStringAsync();


                    return JsonConvert.DeserializeObject<List<Flight>>(data);

                }


                return new List<Flight>();

            }
        // view Flights by id
        // view Flights by id
        public async Task<Flight> GetFlightById(int id)
        {
            HttpResponseMessage response =
                await _client.GetAsync(id.ToString());

            if (response.IsSuccessStatusCode)
            {
                string data =
                    await response.Content.ReadAsStringAsync();

                return JsonConvert.DeserializeObject<Flight>(data);
            }

            return new Flight();
        }


        //public async Flight GetFlightById()

        //{

        //    HttpResponseMessage response =

        //        await _client.GetAsync("");


        //    if (response.IsSuccessStatusCode)

        //    {

        //        string data =

        //            await response.Content.ReadAsStringAsync();


        //        return JsonConvert.DeserializeObject<Flight>(data);

        //    }


        //    return new Flight>();

        //}


        // ADD
        public async Task AddFlight(Flight flight)

{

    string json =

        JsonConvert.SerializeObject(flight);


    StringContent content =

        new StringContent(

            json,

            Encoding.UTF8,

            "application/json");


    await _client.PostAsync("", content);

}


        // UPDATE
        //public async Task UpdateFlight(Flight flight)

        //{

        //    string json =

        //        JsonConvert.SerializeObject(flight);


        //    StringContent content =

        //        new StringContent(

        //            json,

        //            Encoding.UTF8,

        //            "application/json");


        //    await _client.PutAsync("", content);

        //}

        public async Task UpdateFlight(Flight flight)
        {
            string json =
                JsonConvert.SerializeObject(flight);

            StringContent content =
                new StringContent(
                    json,
                    Encoding.UTF8,
                    "application/json");

            HttpResponseMessage response =
                await _client.PutAsync("", content); // ✅ capture response

            // ✅ Handle responses
            if (response.IsSuccessStatusCode)
            {
                Console.WriteLine("Flight updated successfully");
            }
            
            else
            {
                Console.WriteLine($"Error: {response.StatusCode}");
            }
        }


        // DELETE
        public async Task DeleteFlight(int id)

{

    await _client.DeleteAsync(id.ToString());

}


        }
}
