using Delhivery.API.DTOs;
using Delhivery.API.Services;
using Delhivery.Data.Exceptions;
using Microsoft.AspNetCore.Mvc;
namespace Delhivery.API.Controllers
{


    [ApiController]
    [Route("api/[controller]")]
    public class ShipmentsController : ControllerBase
    {
        private readonly IShipmentService _shipmentService;

        public ShipmentsController(IShipmentService shipmentService)
        {
            _shipmentService = shipmentService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var shipments = await _shipmentService.GetAllAsync();

            return Ok(shipments);
        }

        [HttpGet("{awb}")]
        public async Task<IActionResult> GetByAWB(string awb)
        {
            try
            {
                var shipment =
                    await _shipmentService.GetByAWBAsync(awb);

                return Ok(shipment);
            }
            catch (ShipmentNotFoundException ex)
            {
                return NotFound(new
                {
                    message = ex.Message
                });
            }
        }

        [HttpPost]
        public async Task<IActionResult> Book( BookShipmentRequest request)
        {
            try
            {
                var shipment = await _shipmentService.BookAsync(request);

                return CreatedAtAction(
                    nameof(GetByAWB),
                    new
                    {
                        awb = shipment.AWBNumber
                    },
                    shipment);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new
                {
                    message = ex.Message
                });
            }
        }


        [HttpPut("{awb}/status")]
        public async Task<IActionResult> UpdateStatus(string awb,UpdateStatusRequest request)
        {
            try
            {
                var shipment =
                    await _shipmentService
                    .UpdateStatusAsync(awb, request);

                return Ok(shipment);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new
                {
                    message = ex.Message
                });
            }
            catch (ShipmentNotFoundException ex)
            {
                return NotFound(new
                {
                    message = ex.Message
                });
            }
        }

        [HttpDelete("{shipmentId:int}")]
        public async Task<IActionResult> Cancel( int shipmentId)
        {
            try
            {
                await _shipmentService
                    .CancelAsync(shipmentId);

                return NoContent();
            }
            catch (ShipmentNotFoundException ex)
            {
                return NotFound(new
                {
                    message = ex.Message
                });
            }
        }

        [HttpGet("stats")]
        public async Task<IActionResult> GetStats()
        {
            var stats =
                await _shipmentService.GetStatsAsync();

            return Ok(stats);
        }
    }

}
