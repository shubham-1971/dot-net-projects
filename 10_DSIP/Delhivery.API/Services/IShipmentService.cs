using Delhivery.API.DTOs;
namespace Delhivery.API.Services
{
    public interface IShipmentService
    {
        Task<List<ShipmentResponse>> GetAllAsync();

        Task<ShipmentResponse> GetByAWBAsync(string awb);

        Task<ShipmentResponse> BookAsync(BookShipmentRequest request);

        Task<ShipmentResponse> UpdateStatusAsync(string awb, UpdateStatusRequest request);

        Task CancelAsync(int shipmentId);

        Task<ShipmentStatsDto> GetStatsAsync();
    }
}
