using System.Collections.Generic;
using Delhivery.Models;
using Delhivery.Repository;

namespace Delhivery.Services
{
    internal class ShipmentService : IShipmentService
    {
        private readonly IShipmentRepository _repository;

        public ShipmentService(IShipmentRepository repository)
        {
            _repository = repository;
        }

        private (Shipment Shipment, string Error) FindShipment(string awb)
        {
            var shipment = _repository.GetByAWB(awb);
            if (shipment == null)
                return (null, $"Shipment with AWB '{awb}' not found.");
            return (shipment, null);
        }

        public (bool Success, string Message) BookShipment(Shipment shipment)
        {
            if (_repository.GetByAWB(shipment.AWBNumber) != null)
                return (false, $"AWB '{shipment.AWBNumber}' already exists. Must be unique.");

            _repository.Add(shipment);
            return (true, $"Shipment {shipment.AWBNumber} booked successfully.");
        }

        public List<Shipment> ListShipments()
        {
            return _repository.GetAll();
        }

        public (bool Success, string Message) UpdateStatus(string awb, string newStatus)
        {
            var (shipment, notFound) = FindShipment(awb);
            if (notFound != null)
                return (false, notFound);

            _repository.UpdateStatus(awb, newStatus);
            return (true, $"Shipment {awb} status updated to '{newStatus}'.");
        }

        public (bool Success, string Message) CancelShipment(string awb)
        {
            var (shipment, notFound) = FindShipment(awb);
            if (notFound != null)
                return (false, notFound);

            _repository.Remove(awb);
            return (true, $"Shipment {awb} cancelled successfully.");
        }
    }
}
