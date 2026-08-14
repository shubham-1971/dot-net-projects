using Delhivery.Data.Models;


namespace Delhivery.Data.Repository
{
    public interface IShipmentRepository
    {

        Task<List<Shipment>> GetAllAsync();

        Task<Shipment> GetByAWBAsync(string awb);

        Task BookAsync(Shipment shipment);

        Task UpdateStatusAsync(string awb, string status);

        Task CancelAsync(int shipmentId);
       
    }
}
