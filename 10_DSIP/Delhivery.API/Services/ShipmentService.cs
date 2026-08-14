
using Delhivery.API.DTOs;
using Delhivery.Data.Models;
using Delhivery.Data.Repository;
namespace Delhivery.API.Services
{
    public class ShipmentService : IShipmentService
    {
        private readonly IShipmentRepository _repository;

        private static readonly HashSet<string> ValidStatuses = [ "Booked", "In Transit", "Out for Delivery", "Delivered", "RTO" ];

        public ShipmentService(IShipmentRepository repository)
        {
            _repository = repository;
        }

        private static ShipmentResponse MapShipment(Shipment shipment)
        {
            return new ShipmentResponse
            {
                ShipmentId = shipment.ShipmentId,
                AWBNumber = shipment.AWBNumber,
                SenderName = shipment.SenderName,
                ReceiverName = shipment.ReceiverName,
                Origin = shipment.Origin,
                Destination = shipment.Destination,
                WeightKg = shipment.WeightKg,
                Status = shipment.Status,
                BookedAt = shipment.BookedAt,
                DeliveredAt = shipment.DeliveredAt
            };
        }

        public async Task<List<ShipmentResponse>> GetAllAsync()
        {
            var shipments = await _repository.GetAllAsync();

            return shipments
                    .Select(MapShipment)
                    .ToList();
        }

        public async Task<ShipmentResponse> GetByAWBAsync(string awb)
        {
            var shipment = await _repository.GetByAWBAsync(awb);

            return MapShipment(shipment);
        }

        public async Task<ShipmentResponse> BookAsync(BookShipmentRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.AWBNumber))
                throw new ArgumentException("AWB Number is required.");

            if (string.IsNullOrWhiteSpace(request.SenderName))
                throw new ArgumentException("Sender Name is required.");

            if (string.IsNullOrWhiteSpace(request.ReceiverName))
                throw new ArgumentException("Receiver Name is required.");

            if (string.IsNullOrWhiteSpace(request.Origin))
                throw new ArgumentException("Origin is required.");

            if (string.IsNullOrWhiteSpace(request.Destination))
                throw new ArgumentException("Destination is required.");

            if (request.WeightKg <= 0)
                throw new ArgumentException("Weight must be greater than zero.");

            var existingShipments = await _repository.GetAllAsync();

            if (existingShipments.Any(s =>
                s.AWBNumber.Equals(request.AWBNumber, StringComparison.OrdinalIgnoreCase)))
            {
                throw new ArgumentException("AWB Number already exists.");
            }

            Shipment shipment = new()
            {
                AWBNumber = request.AWBNumber.Trim(),
                SenderName = request.SenderName.Trim(),
                ReceiverName = request.ReceiverName.Trim(),
                Origin = request.Origin.Trim(),
                Destination = request.Destination.Trim(),
                WeightKg = request.WeightKg
            };

            await _repository.BookAsync(shipment);

            var savedShipment = await _repository.GetByAWBAsync(request.AWBNumber);

            return MapShipment(savedShipment);
        }

        public async Task<ShipmentResponse> UpdateStatusAsync(
    string awb,
    UpdateStatusRequest request)
        {
            if (string.IsNullOrWhiteSpace(awb))
                throw new ArgumentException("AWB Number is required.");

            if (string.IsNullOrWhiteSpace(request.Status))
                throw new ArgumentException("Status is required.");

            if (!ValidStatuses.Contains(request.Status))
            {
                throw new ArgumentException(
                    "Invalid status. Valid values are: " +
                    string.Join(", ", ValidStatuses));
            }

            await _repository.UpdateStatusAsync(
                awb,
                request.Status);

            var shipment =
                await _repository.GetByAWBAsync(awb);

            return MapShipment(shipment);
        }

        public async Task CancelAsync(int shipmentId)
        {
            if (shipmentId <= 0)
                throw new ArgumentException(
                    "Shipment Id must be greater than zero.");

            await _repository.CancelAsync(shipmentId);
        }

        public async Task<ShipmentStatsDto> GetStatsAsync()
        {
            var shipments = await _repository.GetAllAsync();

            return new ShipmentStatsDto
            {
                Total = shipments.Count,

                Booked =
                    shipments.Count(s => s.Status == "Booked"),

                InTransit =
                    shipments.Count(s => s.Status == "In Transit"),

                OutForDelivery =
                    shipments.Count(s => s.Status == "Out for Delivery"),

                Delivered =
                    shipments.Count(s => s.Status == "Delivered"),

                RTO =
                    shipments.Count(s => s.Status == "RTO")
            };
        }
    }
}
