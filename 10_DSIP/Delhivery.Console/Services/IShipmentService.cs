using System.Collections.Generic;
using Delhivery.Models;

namespace Delhivery.Services
{
    internal interface IShipmentService
    {
        (bool Success, string Message) BookShipment(Shipment shipment);
        List<Shipment> ListShipments();
        (bool Success, string Message) UpdateStatus(string awb, string newStatus);
        (bool Success, string Message) CancelShipment(string awb);
    }
}
