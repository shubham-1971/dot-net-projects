using System.Collections.Generic;
using Delhivery.Models;

namespace Delhivery.Repository
{
    internal interface IShipmentRepository
    {
        void Add(Shipment shipment);
        List<Shipment> GetAll();
        Shipment GetByAWB(string awb);
        void UpdateStatus(string awb, string status);
        bool Remove(string awb);
    }
}
