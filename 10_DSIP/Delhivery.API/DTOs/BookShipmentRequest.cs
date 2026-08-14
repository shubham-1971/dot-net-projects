namespace Delhivery.API.DTOs
{
    public class BookShipmentRequest
    {
        public string AWBNumber { get; set; } = string.Empty;

        public string SenderName { get; set; } = string.Empty;

        public string ReceiverName { get; set; } = string.Empty;

        public string Origin { get; set; } = string.Empty;

        public string Destination { get; set; } = string.Empty;

        public decimal WeightKg { get; set; }
    }
}
