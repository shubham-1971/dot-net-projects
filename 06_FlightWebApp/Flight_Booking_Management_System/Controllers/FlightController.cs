using Flight_Booking_Management_System.models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Flight_Booking_Management_System.Services;

namespace Flight_Booking_Management_System.Controllers
{

        [Route("api/[controller]")]
        [ApiController]
        public class FlightController : ControllerBase
        {
            private readonly IFlightService _service;
            public FlightController(IFlightService service)
            {
                _service = service;
            }

            [HttpGet]
            public IActionResult GetAll()
            {
                var flight = _service.GetFlight();
                if (!flight.Any())
                {
                    return NotFound(" List is Empty Data not Found ");
                }
                return Ok(flight);
            }


            [HttpPost]
            public IActionResult Add(Flight flight)
            {
                if (flight == null)
                {
                    return BadRequest();
                }
                int id = _service.AddFlight(flight);

                flight.FlightId = id;

                return CreatedAtAction(
                    nameof(GetByID),
                    new { id = id },
                    flight);

            }

            [HttpGet("{id}")]

            public IActionResult GetByID(int id)
            {
                var flight = _service.GetById(id);
                if (flight == null)
                {
                    return NotFound(" List is Empty Data not Found ");
                }
                return Ok(flight);
            }

            [HttpDelete("{id}")]

            public IActionResult Delete(int id)
            {
                int i = _service.DeleteFlight(id);
                if (i == 0)
                    return NotFound("Flight not found");

                return Ok("Deleted Successfully");

            }


            [HttpPut("{id}")]
            public IActionResult Update(Flight flight)
            {
                int i = _service.UpdateFlight(flight);
                if (i == 0)
                    return NotFound("Flight not found");
                return Ok("Updated Successfully");
            }
        }
    
}
