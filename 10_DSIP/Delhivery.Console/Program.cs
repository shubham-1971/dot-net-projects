using Delhivery.Presentation;
using Delhivery.Repository;
using Delhivery.Services;

namespace Delhivery
{
    internal class Program
    {
        static void Main(string[] args)
        {
            IShipmentRepository repository = new ShipmentRepository();
            IShipmentService service = new ShipmentService(repository);
            new App(service).Run();
        }
    }
}