
namespace Delhivery.Data.Models
{
    public class Shipment
    {

        public int ShipmentId { get; set; }

        public string AWBNumber { get; set; } = string.Empty;

        public string SenderName { get; set; } = string.Empty;

        public string ReceiverName { get; set; } = string.Empty;

        public string Origin { get; set; } = string.Empty;

        public string Destination { get; set; } = string.Empty;

        public decimal WeightKg { get; set; }

        public string Status { get; set; } = string.Empty;

        public DateTime BookedAt { get; set; }

        public DateTime? DeliveredAt { get; set; }

    }
}
