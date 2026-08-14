using System.Collections.Generic;
using System.Linq;
using Delhivery.Models;

namespace Delhivery.Repository
{
    internal class ShipmentRepository : IShipmentRepository
    {
        private readonly List<Shipment> _shipments = new List<Shipment>();
        private int _nextId = 1;

        // Add a new shipment with auto-generated ID and timestamp
        public void Add(Shipment shipment)
        {
            shipment.ShipmentId = _nextId++;
            shipment.BookedAt = System.DateTime.Now;
            _shipments.Add(shipment);
        }

        // Return a copy of all shipments
        public List<Shipment> GetAll()
        {
            return _shipments.ToList();
        }

        // Find a shipment by its AWB number (or null if not found)
        public Shipment GetByAWB(string awb)
        {
            return _shipments.FirstOrDefault(s => s.AWBNumber == awb);
        }

        // Update the status of a shipment identified by AWB
        public void UpdateStatus(string awb, string status)
        {
            var shipment = _shipments.FirstOrDefault(s => s.AWBNumber == awb);
            if (shipment != null)
            {
                shipment.Status = status;
            }
        }

        // Remove a shipment by AWB; returns true if removed
        public bool Remove(string awb)
        {
            var shipment = _shipments.FirstOrDefault(s => s.AWBNumber == awb);
            if (shipment != null)
            {
                return _shipments.Remove(shipment);
            }
            return false;
        }
    }
}
