namespace Hospital_Management_System.Controllers
{
    using Hospital_Management_System.DTOs;
    using Hospital_Management_System.Services.Interfaces;
    using Microsoft.AspNetCore.Mvc;

    [ApiController]
    [Route("api/[controller]")]
    public class DoctorsController : ControllerBase
    {
        private readonly IDoctorService _service;

        public DoctorsController(IDoctorService service)
        {
            _service = service;
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreateDoctorDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var doctor = new Models.Doctor
                {
                    FullName = dto.FullName,
                    Specialization = dto.Specialization,
                    Mob = dto.Mob,
                    Fee = dto.Fee,
                    Available = dto.Available
                };

                _service.AddDoctor(doctor);

                return StatusCode(201, new
                {
                    message = "Doctor created successfully"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = ex.Message
                });
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] UpdateDoctorDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var doctor = new Models.Doctor
                {
                    Id = id,
                    FullName = dto.FullName,
                    Specialization = dto.Specialization,
                    Mob = dto.Mob,
                    Fee = dto.Fee
                };

                _service.UpdateDoctorDetails(doctor);

                return NoContent(); // 204
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = ex.Message
                });
            }
        }

        [HttpPatch("{id}/availability")]
        public IActionResult UpdateAvailability(int id, [FromBody] UpdateDoctorAvailabilityDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                _service.UpdateDoctorAvailability(id, dto.Available);

                return NoContent(); // 204
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = ex.Message
                });
            }
        }

        // GET with filter
        [HttpGet]
        public IActionResult Get([FromQuery] string? specialization, [FromQuery] bool? available)
        {
            try
            {
                var data = _service.GetDoctors(specialization, available);

                if (data == null || data.Count == 0)
                    return NotFound(new { message = "No doctors found" });

                return Ok(data); // 200
            }
            catch (Exception)
            {
                return StatusCode(500, new
                {
                    message = "Internal server error"
                });
            }
        }
    }
}
