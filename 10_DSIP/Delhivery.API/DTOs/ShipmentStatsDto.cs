namespace Delhivery.API.DTOs
{
    public class ShipmentStatsDto
    {
        public int Total { get; set; }

        public int Booked { get; set; }

        public int InTransit { get; set; }

        public int OutForDelivery { get; set; }

        public int Delivered { get; set; }

        public int RTO { get; set; }
    }
}
